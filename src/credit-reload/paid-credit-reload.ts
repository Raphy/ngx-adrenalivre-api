import { CreditReload } from "./credit-reload";

export class PaidCreditReload extends CreditReload {
    discriminator: string = 'paid';

    currency: string;

    price: number;

    toForm(): Object {
        let form: any = super.toForm();

        form.price = this.price;
        form.currency = this.currency;

        return form;
    }
}