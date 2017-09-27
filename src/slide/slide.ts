import { File } from '../file';
import { Model } from "../model";

export class Slide extends Model {
    title: string;

    description: string;

    position: number;

    backgroundFile: File;

    createdAt: Date;

    updatedAt: Date;

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);

        if (data.backgroundFile) {
            if (this.backgroundFile instanceof File) {
                this.backgroundFile.hydrate(data.backgroundFile);
            } else {
                this.backgroundFile = new File(data.backgroundFile);
            }
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        form.title = this.title;
        form.description = this.description;
        form.position = this.position;
        if (this.backgroundFile) {
            form.backgroundFile = this.backgroundFile.id;
        }

        return form;
    }
}
