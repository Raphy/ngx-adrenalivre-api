import { SafeResourceUrl } from '@angular/platform-browser';


import { User } from '../user';

export class File {
    public id: string;
    public mimeType: string;
    public size: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createdBy: User;
    public contents: any;
    public url: SafeResourceUrl;

    constructor(data: any = {}) {
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
}
