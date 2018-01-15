import { Model } from "../model";

export abstract class PromotionalCode extends Model {
    discriminator: string;

    code: string;

    remainingUsages: number;

    usages: number;

    active: boolean;

    singleUsagePerUser: boolean;

    startAt: Date;

    endAt: Date;

    createdAt: Date;

    note?: string;

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        if (!data) {
            return this;
        }

        this.createdAt = new Date(data.createdAt);
        if (data.startAt) {
            this.startAt = new Date(data.startAt);
        }
        if (data.endAt) {
            this.endAt = new Date(data.endAt);
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        form.discriminator = this.discriminator;
        form.code = this.code;
        form.usages = this.usages;
        form.active = this.active;
        form.singleUsagePerUser = this.singleUsagePerUser;
        if (this.startAt instanceof Date && this.startAt.getTime() === this.startAt.getTime()) {
            form.startAt = this.startAt.toISOString();
        }
        if (this.endAt instanceof Date && this.endAt.getTime() === this.endAt.getTime()) {
            form.endAt = this.endAt.toISOString();
        }
        form.note = this.note;

        return form;
    }
}