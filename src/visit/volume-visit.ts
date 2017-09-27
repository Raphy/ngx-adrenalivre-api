import { Volume } from '../volume';
import { Visit } from "./visit";

export class VolumeVisit extends Visit {
    discriminator: string = 'volume';

    volume: Volume;

    hydrate(data: any) {
        if (data.volume) {
            if (this.volume instanceof Volume) {
                this.volume.hydrate(data.volume);
            } else {
                this.volume = new Volume(data.volume);
            }
        }

        return super.hydrate(data);
    }

    toForm(): object {
        let form: any = super.toForm();

        if (this.volume) {
            form.volume = this.volume.id;
        }

        return form;
    }
}