import { PromotionalCode } from "./promotional-code";
import { Collection } from "../collection";

export class CollectionPromotionalCode extends PromotionalCode {
    public discriminator: string = 'collection';

    public collection: Collection;

    hydrate(data: any) {
        Object.assign(this, data);

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