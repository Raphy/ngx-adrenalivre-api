import { CreditReload } from "./credit-reload";

export class FreeCreditReload extends CreditReload {
    public discriminator: string = 'free';
}