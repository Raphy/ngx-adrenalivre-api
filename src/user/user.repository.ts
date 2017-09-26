import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { User } from './user';
import { Repository } from "../repository";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: User | null = null): string {
        return 'users';
    }

    protected createItem(itemData: any = {}): User {
        return new User(itemData);
    }
}
