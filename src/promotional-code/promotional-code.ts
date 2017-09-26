export abstract class PromotionalCode {
    id: string;

    discriminator: string;

    code: string;

    remainingUsages: number;

    usages: number;

    active: boolean;

    startAt: Date;

    endAt: Date;

    createdAt: Date;

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