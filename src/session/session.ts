import { User } from '../user';
import { Model } from "../model";

export class Session extends Model {
    mode: string;

    expiresAt: Date;

    user: User;

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);

    }

    hydrate(data: any) {
        super.hydrate(data);

        if (!data) {
            return this;
        }

        this.expiresAt = new Date(data.expiresAt);

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

        form.mode = this.mode;

        return form;
    }

    isExpired(): boolean {
        if (this.expiresAt) {
            return new Date() > this.expiresAt
        }

        return false;
    }
}
