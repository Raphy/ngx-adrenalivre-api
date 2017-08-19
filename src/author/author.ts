export class Author {
    public id: string;
    public firstName: string;
    public lastName: string;
    public description: string;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        return this;
    }

    get fullName(): string {
        if (this.firstName || this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }

        return null;
    }
}
