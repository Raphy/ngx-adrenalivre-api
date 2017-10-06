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
                let collectionBookList = new CollectionBookList(data);
                collectionBookList.hydrate(data);

                return collectionBookList;
            case 'volume':
                let volumeBookList = new VolumeBookList(data);
                volumeBookList.hydrate(data);

                return volumeBookList;
            default:
                throw new Error('The book list discriminator "' + discriminator + '" is not handled');
        }
    }
}