import { CreditReload } from "./credit-reload";

export class FreeCreditReload extends CreditReload {
    discriminator: string = 'free';
}