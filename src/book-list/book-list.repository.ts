import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { BookList } from './book-list';
import { Repository } from "../repository";
import { BookListFactory } from "./book-list-factory";

@Injectable()
export class BookListRepository extends Repository<BookList> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: BookList | null = null): string {
        return 'bookLists';
    }

    protected createItem(itemData: any = {}): BookList {
        console.log('Creating BookList item', itemData);
        let item = BookListFactory.create(itemData.discriminator, itemData);

        console.log('Created BookList item', item);

        return item;
    }
}
