import { CreditOffer } from "./credit-offer";
import { Form } from "../form";

export class CreditOfferForm extends Form<CreditOffer> {
    name: string;

    credits: number;

    price: number;

    currency: string;

    populate(item: CreditOffer) {
        this.name = item.name;
        this.credits = item.credits;
        this.price = item.price;
        this.currency = item.currency;
    }
}