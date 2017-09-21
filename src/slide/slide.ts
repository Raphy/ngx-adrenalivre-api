import { File } from '../file';

export class Slide {
    public id: string;
    public title: string;
    public description: string;
    public position: number;
    public backgroundFile: File;
    public createdAt: Date;
    public updatedAt: Date;

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
