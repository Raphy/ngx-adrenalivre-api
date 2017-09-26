import { File } from "../file";

export class Genre {
    id: string;

    name: string;

    illustrationFile: File;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        if (data.illustrationFile) {
            if (this.illustrationFile instanceof File) {
                this.illustrationFile.hydrate(data.illustrationFile);
            } else {
                this.illustrationFile = new File(data.illustrationFile);
            }
        }

        return this;
    }
}
