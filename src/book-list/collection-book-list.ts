import { BookList } from "./book-list";
import { Collection } from "../collection";

export class CollectionBookList extends BookList {
    public discriminator: string = 'collection';

    public collections: Collection[];

    hydrate(data: any) {
        Object.assign(this, data);

        if (data.collections) {
            this.collections = data.collections.map((collectionData => new Collection(collectionData)));
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        if (this.collections) {
            form.collections = this.collections.map((collection) => collection.id);
        }

        return form;
    }
}