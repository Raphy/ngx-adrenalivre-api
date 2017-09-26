import { PromotionalCodeForm } from "./promotional-code-form";
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
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        this.createdAt = new Date(data.createdAt);
        this.endAt = new Date(data.endAt);
        this.startAt = new Date(data.startAt);

        return this;
    }

    toForm(): PromotionalCodeForm {
        let form = new PromotionalCodeForm();
        form.populate(this);

        return form;
    }
}