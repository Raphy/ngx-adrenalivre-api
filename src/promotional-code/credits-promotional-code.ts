import { PromotionalCode } from "./promotional-code";

export class CreditsPromotionalCode extends PromotionalCode {
    public discriminator: string = 'credits';

    public credits: number;

    toForm(): object {
        let form: any = super.toForm();

        form.credits = this.credits;

        return form;
    }
}