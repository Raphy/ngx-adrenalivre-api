import { Rate } from "./rate";
import { Collection } from "../collection";

export class CollectionRate extends Rate {
    discriminator = 'collection';

    collection: Collection;

    hydrate(data: any) {
        Object.assign(this, data);

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
}