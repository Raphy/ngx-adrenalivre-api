import { CreditReload } from "./credit-reload";

export class PaidCreditReload extends CreditReload {
    discriminator: string = 'paid';

    currency: string;

    price: number;
}