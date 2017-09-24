import { User } from '../user';

export class Visit {

    public discriminator: string;

    public user: User;

    public visitedAt: Date;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.visitedAt = new Date(data.visitedAt);

        return this;
    }
}