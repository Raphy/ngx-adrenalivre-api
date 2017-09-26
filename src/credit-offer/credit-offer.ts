import { CreditOfferForm } from "./credit-offer-form";

export class CreditOffer {
    id: string;

    name: string;

    credits: number;

    price: number;

    currency: string;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        return this;
    }

    toForm(): CreditOfferForm {
        let form = new CreditOfferForm();
        form.populate(this);

        return form;
    }
}
