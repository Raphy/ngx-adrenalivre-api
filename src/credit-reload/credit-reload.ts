import { User } from "../user";

export abstract class CreditReload {
    public id: string;

    public discriminator: string;

    public credits: number;

    public createdAt: Date;

    public user: User;

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