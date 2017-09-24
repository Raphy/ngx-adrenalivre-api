import { CreditReload } from "./credit-reload";

export class PaidCreditReload extends CreditReload {
    public discriminator: string = 'paid';

    public currency: string;

    public price: number;
}