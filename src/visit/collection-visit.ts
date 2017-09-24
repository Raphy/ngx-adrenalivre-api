import { Collection } from '../collection';
import { Visit } from "./visit";

export class CollectionVisit extends Visit {

    public discriminator: string = 'collection';

    public collection: Collection;

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
}