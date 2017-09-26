import { File } from "../file";
import { Volume } from "../volume";
import { AuthorForm } from "./author-form";
import { Model } from "../model";

export class Author extends Model{
    id: string;

    firstName: string;

    lastName: string;

    description?: string;

    profileImageFile: File;

    facebookUrl?: string;

    twitterUrl?: string;

    websiteUrl?: string;

    recommendationRate?: number;

    volumes: Volume[];

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) : this {
        super.hydrate(data);

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

    toForm(): AuthorForm {
        let form = new AuthorForm();
        form.populate(this);

        return form;
    }

    get fullName(): string | null {
        if (this.firstName || this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }

        return null;
    }
}
