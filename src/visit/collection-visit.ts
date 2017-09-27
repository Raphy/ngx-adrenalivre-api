import { Collection } from '../collection';
import { Visit } from "./visit";

export class CollectionVisit extends Visit {
    discriminator: string = 'collection';

    collection: Collection;

    hydrate(data: any) {
        if (data.collection) {
            if (this.collection instanceof Collection) {
                this.collection.hydrate(data.collection);
            } else {
                this.collection = new Collection(data.collection);
            }
        }

        return super.hydrate(data);
    }

    toForm(): object {
        let form: any = super.toForm();

        if (this.collection) {
            form.collection = this.collection.id;
        }

        return form;
    }
}