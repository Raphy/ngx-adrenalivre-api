import { BookList } from "./book-list";
import {CollectionBookListItem} from "./collection-book-list-item";

export class CollectionBookList extends BookList {
    public discriminator: string = 'collection';

    public items: CollectionBookListItem[] = [];

    hydrate(data: any) {
        super.hydrate(data);

        if (!data) {
            return this;
        }

        if (data.items) {
            this.items = data.items.map((itemData) => new CollectionBookListItem(itemData));
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        if (this.items) {
            form.items = this.items.map((item) => item.toForm());
        }

        return form;
    }
}