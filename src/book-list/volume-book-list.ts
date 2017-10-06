import { BookList } from "./book-list";
import { Volume } from "../volume";

export class VolumeBookList extends BookList {
    public discriminator: string = 'volume';

    public volumes: Volume[] = [];

    hydrate(data: any) {
        super.hydrate(data);

        console.log('VolumeBookList.hydrate', data);
        console.log('VolumeBookList.hydrate', this.volumes);

        if (data.volumes) {
            this.volumes = data.volumes.map((volumeData => new Volume(volumeData)));
        }

        console.log('VolumeBookList.hydrate', this.volumes);

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