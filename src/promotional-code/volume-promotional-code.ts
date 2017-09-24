import { PromotionalCode } from "./promotional-code";
import { Volume } from "../volume";

export class VolumePromotionalCode extends PromotionalCode {
    public discriminator: string = 'volume';

    public volume: Volume;

    hydrate(data: any) {
        Object.assign(this, data);

        if (data.volume) {
            if (this.volume instanceof Volume) {
                this.volume.hydrate(data.volume);
            } else {
                this.volume = new Volume(data.volume);
            }
        }

        return this;
    }
}