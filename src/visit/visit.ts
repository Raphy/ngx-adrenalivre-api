import { User } from '../user';
import { Model } from "../model";

export abstract class Visit extends Model {
    discriminator: string;

    user: User;

    visitedAt: Date;

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        this.visitedAt = new Date(data.visitedAt);

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

        return form;
    }
}