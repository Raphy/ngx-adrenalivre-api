import { Injectable } from '@angular/core';
import { BookList } from "./book-list";
import { CollectionBookList } from "./collection-book-list";
import { VolumeBookList } from "./volume-book-list";

@Injectable()
export class BookListFactory {
    public static create(discriminator: string, data: any = {}): BookList
    {
        let item;
        console.log('Creating BookList', discriminator, data);
        switch (discriminator) {
            case 'collection':
                item = new CollectionBookList(data);

                console.log('Created Factory', item);

                return item;
            case 'volume':
                item = new VolumeBookList(data);

                console.log('Created Factory', item);

                return item;
            default:
                throw new Error('The book list discriminator "' + discriminator + '" is not handled');
        }
    }
}