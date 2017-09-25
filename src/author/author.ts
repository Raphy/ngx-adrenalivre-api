import { File } from "../file";
import { Volume } from "../volume";

export class Author {
    public id: string;
    public firstName: string;
    public lastName: string;
    public description?: string;
    public profileImageFile: File;
    public facebookUrl?: string;
    public twitterUrl?: string;
    public websiteUrl?: string;
    public recommendationRate?: string;
    public volumes: Volume[];

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        if (data.profileImageFile) {
            if (this.profileImageFile instanceof File) {
                this.profileImageFile.hydrate(data.profileImageFile);
            } else {
                this.profileImageFile = new File(data.profileImageFile);
            }
        }

        if (data.volumes) {
            this.volumes = data.volumes.map((volumeData) => new Volume(volumeData));
        }

        return this;
    }

    toJson(): object {
        let obj = Object.create(this);

        if (this.profileImageFile) {
            obj.profileImageFile = this.profileImageFile.id;
        }

        return obj;
    }

    get fullName(): string {
        if (this.firstName || this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }

        return null;
    }
}
