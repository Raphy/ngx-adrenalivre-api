import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { User } from './user';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { UserForm } from "./user-form";

@Injectable()
export class UserRepository implements Repository<User> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<User[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/users', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((userObject) => new User(userObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<User | Error> {
        return this.http.get(this.configuration.baseUrl + '/users/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new User(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(userForm, UserForm, user: User = null): Observable<User | Error> {
        if (user && user.id) {
            return this.http.patch(this.configuration.baseUrl + '/users/' + user.id, userForm)
                .map((response: Response) => response.json())
                .map((data: object) => user.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/users', userForm)
            .map((response: Response) => response.json())
            .map((data: object) => user.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(user: User): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/users/' + user.id)
            .map((response: Response) => null)
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }
}
