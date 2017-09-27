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

    toForm(): object {
        let form: any = super.toForm();

        if (this.collection) {
            form.collection = this.collection.id;
        }

        return form;
    }
}