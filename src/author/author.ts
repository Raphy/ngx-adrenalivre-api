import { File } from "../file";
import { Volume } from "../volume";
import { Model } from "../model";
import { AuthorRate } from "../rate";
import { AuthorVisit } from "../visit";

export class Author extends Model{
    firstName: string;

    lastName: string;

    description?: string;

    profileImageFile: File;

    facebookUrl?: string;

    twitterUrl?: string;

    websiteUrl?: string;

    recommendationRate?: number;

    volumes: Volume[] = [];

    rates: AuthorRate[] = [];

    visits: AuthorVisit[] = [];

    constructor(data: any = {}) {
        super(data);
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

        if (data.rates) {
            this.rates = data.rates.map((rateDate => new AuthorRate(rateDate)));
        }

        if (data.visits) {
            this.visits = data.visits.map((visitDate => new AuthorVisit(visitDate)));
        }

        return this;
    }

    toForm(): object {
       let form: any = super.toForm();

        form.firstName = this.firstName;
        form.lastName = this.lastName;
        form.description = this.description;
        if (this.profileImageFile) {
            form.profileImageFile = this.profileImageFile.id;
        }
        form.facebookUrl = this.facebookUrl;
        form.twitterUrl = this.twitterUrl;
        form.websiteUrl = this.websiteUrl;

       return form;
    }

    get fullName(): string | null {
        if (this.firstName || this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }

        return null;
    }
}
