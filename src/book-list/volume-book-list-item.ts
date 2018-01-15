import { Volume } from "../volume";
import {Model} from "../model";

export class VolumeBookListItem extends Model {
    public position: number;

    public volume: Volume;

    hydrate(data: any) {
        super.hydrate(data);

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

    toForm(): object {
        let form: any = super.toForm();

        form.position = this.position;
        if (this.volume) {
            form.volume = this.volume.id;
        }

        return form;
    }
}