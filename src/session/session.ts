import { User } from '../user';
import { SessionForm } from "./session-form";
import { Model } from "../model";

export abstract class Session extends Model {
    id: string;

    mode: string;

    expiresAt: Date;

    user: User;

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

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

    toForm(): SessionForm {
        let form = new SessionForm();
        form.populate(this);

        return form;
    }

    isExpired(): boolean {
        if (this.expiresAt) {
            return new Date() > this.expiresAt
        }

        return false;
    }
}
