import { CreditOfferForm } from "./credit-offer-form";
import { Model } from "../model";

export class CreditOffer extends Model {
    name: string;

    credits: number;

    price: number;

    currency: string;

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    toForm(): CreditOfferForm {
        let form = new CreditOfferForm();
        form.populate(this);

        return form;
    }
}
