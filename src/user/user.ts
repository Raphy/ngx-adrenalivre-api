import { File } from "../file";
import { Volume } from "../volume/volume";
import { CreditReload } from "../credit-reload/credit-reload";
import { CreditReloadFactory } from "../credit-reload/credit-reload-factory";
import { UserForm } from "./user-form";

export class User {
    id: string;

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

    volumes: Volume[];

    creditReloads: CreditReload[];

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.createdAt = new Date(data.createdAt);

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

        if (data.creditReloads) {
            this.creditReloads = data.creditReloads.map((creditReloadData) => CreditReloadFactory.create(creditReloadData.discriminator, creditReloadData));
        }

        return this;
    }

    toForm(): UserForm {
        let form = new UserForm();
        form.populate(this);

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
