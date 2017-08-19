export class User {
    public id: string;
    public emailAddress: string;
    public firstName: string;
    public lastName: string;
    public administrator: boolean;
    public betaTester: boolean;
    public subscribedToNewsletter: boolean;
    public credits: number;
    public createdAt: Date;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.createdAt = new Date(data.createdAt);

        return this;
    }

    get fullName(): string {
        if (this.firstName || this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }

        return null
    }

    get nickName(): string {
        if (this.fullName) {
            return this.fullName;
        }

        if (this.emailAddress) {
            return this.emailAddress;
        }

        return this.id;
    }
}
