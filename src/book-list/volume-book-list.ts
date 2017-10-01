import { BookList } from "./book-list";
import { Volume } from "../volume";

export class VolumeBookList extends BookList {
    public discriminator: string = 'volume';

    public volumes: Volume[] = [];

    hydrate(data: any) {
        Object.assign(this, data);

        if (data.volumes) {
            this.volumes = data.volumes.map((volumeData => new Volume(volumeData)));
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        if (this.volumes) {
            form.volumes = this.volumes.map((volume) => volume.id);
        }

        return form;
    }
}