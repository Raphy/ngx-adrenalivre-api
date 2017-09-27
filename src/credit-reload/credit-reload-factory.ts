import { Injectable } from '@angular/core';

import { CreditReload } from "./credit-reload";
import { PromotionalCodeCreditReload } from "./promotional-code-credit-reload";
import { FreeCreditReload } from "./free-credit-reload";
import { PaidCreditReload } from "./paid-credit-reload";

@Injectable()
export class CreditReloadFactory {
    static create(discriminator: string, data: any = {}): CreditReload
    {
        switch (discriminator) {
            case 'free':
                return new FreeCreditReload(data);
            case 'paid':
                return new PaidCreditReload(data);
            case 'promotional_code':
                return new PromotionalCodeCreditReload(data);
            default:
                throw new Error('The credit reload discriminator "' + discriminator + '" is not handled');
        }
    }
}