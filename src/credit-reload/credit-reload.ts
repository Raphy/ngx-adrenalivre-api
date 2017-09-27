import { User } from "../user";
import { Model } from "../model";

export abstract class CreditReload extends Model {
    discriminator: string;

    credits: number;

    createdAt: Date;

    user: User;

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

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

    toForm(): object {
        let form: any = super.toForm();

        form.discriminator = this.discriminator;
        form.credits = this.credits;
        if (this.user) {
            form.user = this.user.id;
        }

        return form;
    }
}