import { User } from '../user';
import { SessionForm } from "./session-form";

export abstract class Session {
    id: string;

    mode: string;

    expiresAt: Date;

    user: User;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

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
