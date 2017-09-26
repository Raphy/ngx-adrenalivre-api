import { User } from "../user";
import { CreditReloadForm } from "./credit-reload-form";
import { Model } from "../model";

export abstract class CreditReload extends Model {
    id: string;

    discriminator: string;

    credits: number;

    createdAt: Date;

    user: User;

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.createdAt = new Date(data.createdAt);

        if (data.user) {
            if (this.user instanceof User) {
                this.user.hydrate(data.user);
            } else {
                this.user = new User(data.user);
            }
        }

        return this;
    }

    toForm(): CreditReloadForm {
        let form = new CreditReloadForm();
        form.populate(this);

        return form;
    }
}