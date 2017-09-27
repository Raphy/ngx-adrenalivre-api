import { Model } from "../model";

export class CreditOffer extends Model {
    name: string;

    credits: number;

    price: number;

    currency: string;

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    toForm(): object {
        let form: any = super.toForm();

        form.name = this.name;
        form.credits = this.credits;
        form.price = this.price;
        form.currency = this.currency;

        return form;
    }
}
