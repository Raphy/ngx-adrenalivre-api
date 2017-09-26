import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Error } from '../error';
import { SessionRepository, Session, SessionForm } from '../session';
import { User, UserRepository } from "../user";

@Injectable()
export class AuthService {
    cachedSession: Session = null;

    constructor(private sessionRepository: SessionRepository, private userRepository: UserRepository) {
    }

    getUser(): Observable<User | null> {
        return this.getSession()
            .switchMap((session: Session | Error) => {
                if (session && session instanceof Session && session.user && session.user.id) {
                    return this.userRepository.retrieve(session.user.id)
                        .catch(() => {
                            return Observable.of(null);
                        });
                }

                return Observable.of(null);
            });
    }

    private setSession(session: Session | null) {
        if (session) {
            if (session.id) {
                this.cachedSession = session;
                localStorage.setItem('adrenalivre_session_id', session.id);
            }
        } else {
            this.cachedSession = null;
            localStorage.removeItem('adrenalivre_session_id');
        }
    }

    getSession(): Observable<Session | null> {

        if (this.cachedSession === null) {
            const sessionId = localStorage.getItem('adrenalivre_session_id');
            if (sessionId) {
                return this.sessionRepository.retrieve(sessionId).map((session) => session instanceof Session ? session : null).map((session) => {
                    this.setSession(session);
                    return session;
                }).catch(() => {
                    this.setSession(null);
                    return Observable.of(null);
                });
            }
        }

        return Observable.of(this.cachedSession);
    }

    isSignedIn(): Observable<boolean> {
        return this.getSession()
            .map((session: Session | null) => {
                if (session) {
                    if (session.isExpired()) {
                        this.setSession(null);
                        return false;
                    }

                    return true;
                }

                return false;
            });
    }

    signIn(session: Session): Observable<boolean> {
        return this
            .isSignedIn()
            .flatMap((isSignedIn) => {
                if (isSignedIn) {
                    return Observable.of(true);
                }

                return this.sessionRepository
                    .save(session)
                    .map((session: Session | Error) => {
                        if (session instanceof Session) {
                            this.setSession(session);
                            return true;
                        }
                        return false;
                    }).catch(() => {
                        return Observable.of(false);
                    });
            });
    }

    signOut(): Observable<boolean> {
        return this.getSession()
            .flatMap((session: Session | null) => {
                if (session) {
                    return this.sessionRepository.remove(session).map(() => {
                        this.setSession(null);
                        return true;
                    }).catch(() => {
                        return Observable.of(true);
                    });
                }

                return Observable.of(true);
            });
    }
}
