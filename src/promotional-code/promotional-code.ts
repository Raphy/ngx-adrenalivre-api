export abstract class PromotionalCode {
    public id: string;

    public discriminator: string;

    public code: string;

    public remainingUsages: number;

    public usages: number;

    public active: boolean;

    public startAt: Date;

    public endAt: Date;

    public createdAt: Date;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.createdAt = new Date(data.createdAt);
        this.endAt = new Date(data.endAt);
        this.startAt = new Date(data.startAt);

        return this;
    }
}