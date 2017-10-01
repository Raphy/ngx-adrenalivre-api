import { Injectable } from '@angular/core';
import { BookList } from "./book-list";
import { CollectionBookList } from "./collection-book-list";
import { VolumeBookList } from "./volume-book-list";

@Injectable()
export class BookListFactory {
    public static create(discriminator: string, data: any = {}): BookList
    {
        switch (discriminator) {
            case 'collection':
                return new CollectionBookList(data);
            case 'volume':
                return new VolumeBookList(data);
            default:
                throw new Error('The book list discriminator "' + discriminator + '" is not handled');
        }
    }
}