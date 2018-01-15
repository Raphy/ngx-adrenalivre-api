import { Collection } from "../collection";
import {Model} from "../model";

export class CollectionBookListItem extends Model {
    public position: number;

    public collection: Collection;

    hydrate(data: any) {
        super.hydrate(data);

        if (!data) {
            return this;
        }

        if (data.collection) {
            if (this.collection instanceof Collection) {
                this.collection.hydrate(data.collection);
            } else {
                this.collection = new Collection(data.collection);
            }
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        form.position = this.position;
        if (this.collection) {
            form.collection = this.collection.id;
        }

        return form;
    }
}