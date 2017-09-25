import { File } from "../file";
import { Volume } from "../volume";

export class Author {
    id: string;

    firstName: string;

    lastName: string;

    description?: string;

    profileImageFile: File;

    facebookUrl?: string;

    twitterUrl?: string;

    websiteUrl?: string;

    recommendationRate?: string;

    volumes: Volume[];

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) : this {
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

    get fullName(): string | null {
        if (this.firstName || this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }

        return null;
    }
}
