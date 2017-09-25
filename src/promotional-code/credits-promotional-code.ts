import { PromotionalCode } from "./promotional-code";

export class CreditsPromotionalCode extends PromotionalCode {
    public discriminator: string = 'credits';

    public credits: number;
}