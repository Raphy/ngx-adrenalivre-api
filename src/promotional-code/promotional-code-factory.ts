import { Injectable } from '@angular/core';
import { PromotionalCode } from "./promotional-code";
import { CollectionPromotionalCode } from "./collection-promotional-code";
import { CreditsPromotionalCode } from "./credits-promotional-code";
import { VolumePromotionalCode } from "./volume-promotional-code";

@Injectable()
export class PromotionalCodeFactory {
    public static create(discriminator: string, data: any = {}): PromotionalCode
    {
        switch (discriminator) {
            case 'collection':
                return new CollectionPromotionalCode(data);
            case 'credits':
                return new CreditsPromotionalCode(data);
            case 'volume':
                return new VolumePromotionalCode(data);
            default:
                throw new Error('The credit reload discriminator "' + discriminator + '" is not handled');
        }
    }
}