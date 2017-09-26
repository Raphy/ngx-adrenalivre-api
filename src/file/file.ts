import { SafeResourceUrl } from '@angular/platform-browser';


import { User } from '../user';
import { FileForm } from "./file-form";
import { Model } from "../model";

export class File extends Model {
    id: string;

    mimeType: string;

    size: number;

    createdAt: Date;

    updatedAt: Date;

    createdBy: User;

    contents: any;

    url: SafeResourceUrl | string;

    attach: string;

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);

        if (data.createdBy) {
            if (this.createdBy instanceof User) {
                this.createdBy.hydrate(data.createdBy);
            } else {
                this.createdBy = new User(data.createdBy);
            }
        }

        return this;
    }

    toForm(): FileForm {
        let form = new FileForm();
        form.populate(this);

        return form;
    }
}
