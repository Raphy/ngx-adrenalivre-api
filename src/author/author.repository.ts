import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Author } from './author';
import { Repository } from "../repository";

@Injectable()
export class AuthorRepository extends Repository<Author> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: Author | null = null): string {
        return 'authors';
    }

    protected createItem(itemData: any = {}): Author {
        return new Author(itemData);
    }
}
