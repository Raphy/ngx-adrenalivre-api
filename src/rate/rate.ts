import { Model } from "../model";
import { User } from "../user/user";

export class Rate extends Model
{
    discriminator: string;

    user: User;

    ratedAt: Date;

    mark: string;

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) : this {
        super.hydrate(data);

        if (data.user) {
            if (this.user instanceof User) {
                this.user.hydrate(data.user);
            } else {
                this.user = new User(data.user);
            }
        }

        this.ratedAt = new Date(data.ratedAt);

        return this;
    }
}