import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Session } from './session';
import { Repository } from "../repository";

@Injectable()
export class SessionRepository extends Repository<Session> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: Session | null = null): string {
        return 'sessions';
    }

    protected createItem(itemData: any = {}): Session {
        return new Session(itemData);
    }
}
