import { CreditReload } from "./credit-reload";
import { CreditsPromotionalCode } from "../promotional-code/credits-promotional-code";

export class PromotionalCodeCreditReload extends CreditReload {
    public discriminator: string = 'promotional_code';

    public creditsPromotionalCode: CreditsPromotionalCode;

    hydrate(data: any) {
        if (data.creditsPromotionalCode) {
            if (this.creditsPromotionalCode instanceof CreditsPromotionalCode) {
                this.creditsPromotionalCode.hydrate(data.creditsPromotionalCode);
            } else {
                this.creditsPromotionalCode = new CreditsPromotionalCode(data.creditsPromotionalCode);
            }
        }

        return super.hydrate(data);
    }
}