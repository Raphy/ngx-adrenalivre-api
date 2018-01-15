import { BookList } from "./book-list";
import {VolumeBookListItem} from "./volume-book-list-item";

export class VolumeBookList extends BookList {
    public discriminator: string = 'volume';

    public items: VolumeBookListItem[] = [];

    hydrate(data: any) {
        super.hydrate(data);

        if (!data) {
            return this;
        }

        if (data.items) {
            this.items = data.items.map((itemData) => new VolumeBookListItem(itemData));
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