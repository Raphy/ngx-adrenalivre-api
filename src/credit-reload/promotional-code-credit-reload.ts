import { CreditReload } from "./credit-reload";
import { CreditsPromotionalCode } from "../promotional-code/credits-promotional-code";

export class PromotionalCodeCreditReload extends CreditReload {
    discriminator: string = 'promotional_code';

    creditsPromotionalCode: CreditsPromotionalCode;

    hydrate(data: any) {
        super.hydrate(data);

        if (data.creditsPromotionalCode) {
            if (this.creditsPromotionalCode instanceof CreditsPromotionalCode) {
                this.creditsPromotionalCode.hydrate(data.creditsPromotionalCode);
            } else {
                this.creditsPromotionalCode = new CreditsPromotionalCode(data.creditsPromotionalCode);
            }
        }

        return super.hydrate(data);
    }

    toForm(): Object {
        let form: any = super.toForm();

        if (this.creditsPromotionalCode) {
            form.creditsPromotionalCode = this.creditsPromotionalCode.id;
        }

        return form;
    }
}