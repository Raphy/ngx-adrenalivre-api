import { File } from '../file';

export class Slide {
    id: string;

    title: string;

    description: string;

    position: number;

    backgroundFile: File;

    createdAt: Date;

    updatedAt: Date;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

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
}
