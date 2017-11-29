import { File } from "../file";
import { Volume } from "../volume/volume";
import { CreditReload } from "../credit-reload/credit-reload";
import { CreditReloadFactory } from "../credit-reload/credit-reload-factory";
import { Model } from "../model";
import { Collection } from "../collection/collection";
import { Genre } from "../genre/genre";
import { Author } from "../author/author";

export class User extends Model {
    emailAddress: string;

    plainPassword: string;

    firstName: string;

    lastName: string;

    administrator: boolean;

    betaTester: boolean;

    subscribedToNewsletter: boolean;

    credits: number;

    createdAt: Date;

    profilePhotoFile: File;

    volumes: Volume[] = [];

    creditReloads: CreditReload[] = [];

    wishedVolumes: Volume[] = [];

    lastActivityAt: Date;

    top5CollectionsVisited: Collection[] = [];

    top5VolumesVisited: Volume[] = [];

    top5GenresVisited: Genre[] = [];

    top5AuthorsVisited: Author[] = [];

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        this.createdAt = new Date(data.createdAt);

        if (data.lastActivityAt) {
            this.lastActivityAt = new Date(data.lastActivityAt);
        }

        if (data.profilePhotoFile) {
            if (this.profilePhotoFile instanceof File) {
                this.profilePhotoFile.hydrate(data.profilePhotoFile);
            } else {
                this.profilePhotoFile = new File(data.profilePhotoFile);
            }
        }

        if (data.volumes) {
            this.volumes = data.volumes.map((volumeData) => new Volume(volumeData));
        }

        if (data.wishedVolumes) {
            this.wishedVolumes = data.wishedVolumes.map((volumeData) => new Volume(volumeData));
        }

        if (data.creditReloads) {
            this.creditReloads = data.creditReloads.map((creditReloadData) => CreditReloadFactory.create(creditReloadData.discriminator, creditReloadData));
        }

        if (data.top5CollectionsVisited) {
            this.top5CollectionsVisited = data.top5CollectionsVisited.map((collectionData) => new Collection(collectionData));
        }

        if (data.top5VolumesVisited) {
            this.top5VolumesVisited = data.top5VolumesVisited.map((volumeData) => new Volume(volumeData));
        }

        if (data.top5GenresVisited) {
            this.top5GenresVisited = data.top5GenresVisited.map((genreData) => new Genre(genreData));
        }

        if (data.top5AuthorsVisited) {
            this.top5AuthorsVisited = data.top5AuthorsVisited.map((authorData) => new Author(authorData));
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        form.emailAddress = this.emailAddress;
        form.plainPassword = this.plainPassword;
        form.firstName = this.firstName;
        if (this.profilePhotoFile) {
            form.profilePhotoFile = this.profilePhotoFile.id;
        }
        form.administrator = this.administrator;
        form.betaTester = this.betaTester;
        form.credits = this.credits;

        return form;
    }

    get fullName(): string {
        if (this.firstName || this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }

        return null
    }

    get nickName(): string {
        if (this.fullName) {
            return this.fullName;
        }

        if (this.emailAddress) {
            return this.emailAddress;
        }

        return this.id;
    }
}
