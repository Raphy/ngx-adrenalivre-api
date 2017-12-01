import { Rate } from "./rate";
import { Volume } from "../volume";

export class VolumeRate extends Rate {
    discriminator = 'volume';

    volume: Volume;

    hydrate(data: any) {
        Object.assign(this, data);

        if (!data) {
            return this;
        }

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