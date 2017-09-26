import { User } from '../user';
import { VisitForm } from "./visit-form";
import { Model } from "../model";

export abstract class Visit extends Model {

    public id: string;

    public discriminator: string;

    public user: User;

    public visitedAt: Date;

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.visitedAt = new Date(data.visitedAt);

        if (data.user) {
            if (this.user instanceof User) {
                this.user.hydrate(data.user);
            } else {
                this.user = new User(data.user);
            }
        }

        return this;
    }

    toForm(): VisitForm {
        let form = new VisitForm();
        form.populate(this);

        return form;
    }
}