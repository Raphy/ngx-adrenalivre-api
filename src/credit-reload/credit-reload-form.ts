import { CreditReload } from "./credit-reload";
import { Form } from "../form";
import { PaidCreditReload } from "./paid-credit-reload";
import { PromotionalCodeCreditReload } from "./promotional-code-credit-reload";

export class CreditReloadForm extends Form<CreditReload> {
    discriminator: string;

    price: number;

    currency: string;

    creditsPromotionalCode: string;

    credits: number;

    user: string;

    populate(item: CreditReload) {
        this.discriminator = item.discriminator;
        this.credits = item.credits;
        if (item.user) {
            this.user = item.user.id;
        }
        if (item instanceof PaidCreditReload) {
            this.price = item.price;
            this.currency = item.currency;
        } else if (item instanceof PromotionalCodeCreditReload) {
            this.creditsPromotionalCode = item.creditsPromotionalCode;
        }
    }
}