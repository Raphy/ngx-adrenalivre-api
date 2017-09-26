import { User } from "../user";

export abstract class CreditReload {
    id: string;

    discriminator: string;

    credits: number;

    createdAt: Date;

    user: User;

    constructor(data: any = {}) {
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
}