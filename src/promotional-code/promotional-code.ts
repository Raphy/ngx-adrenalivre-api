import { Model } from "../model";

export abstract class PromotionalCode extends Model {
    discriminator: string;

    code: string;

    remainingUsages: number;

    usages: number;

    active: boolean;

    startAt: Date;

    endAt: Date;

    createdAt: Date;

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        this.createdAt = new Date(data.createdAt);
        this.endAt = new Date(data.endAt);
        this.startAt = new Date(data.startAt);

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        form.discriminator = this.discriminator;
        form.code = this.code;
        form.usages = this.usages;
        form.active = this.active;
        if (this.startAt) {
            form.startAt = this.startAt.toISOString();
        }
        if (this.endAt) {
            form.endAt = this.endAt.toISOString();
        }

        return form;
    }
}