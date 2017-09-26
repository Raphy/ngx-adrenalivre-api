import { PromotionalCode } from "./promotional-code";
import { Form } from "../form";
import { CreditsPromotionalCode } from "./credits-promotional-code";
import { CollectionPromotionalCode } from "./collection-promotional-code";
import { VolumePromotionalCode } from "./volume-promotional-code";

export class PromotionalCodeForm extends Form<PromotionalCode> {
    discriminator: string;

    credits: number;

    collection: string;

    volume: string;

    code: string;

    usages: number;

    active: boolean;

    startAt: string;

    endAt: string;

    populate(item: PromotionalCode) {
        this.discriminator = item.discriminator;
        if (item instanceof CreditsPromotionalCode) {
            this.credits = item.credits;
        } else if (item instanceof CollectionPromotionalCode) {
            this.collection = item.collection.id;
        } else if (item instanceof VolumePromotionalCode) {
            this.volume = item.volume.id;
        }
        this.code = item.code;
        this.usages = item.usages;
        this.active = item.active;
        this.startAt = item.startAt.toISOString();
        this.endAt = item.endAt.toISOString();
    }
}