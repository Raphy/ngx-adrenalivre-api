import { User } from '../user';

export class Session {
    public id: string;
    public mode: string;
    public expiresAt: Date;
    public user: User;

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

    isExpired(): boolean {
        if (this.expiresAt) {
            return new Date() > this.expiresAt
        }

        return false;
    }
}
