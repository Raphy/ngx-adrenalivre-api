import { Model } from "../model";

export abstract class BookList extends Model {
    discriminator: string;

    name: string;

    toForm(): object {
        let form: any = super.toForm();

        form.discriminator = this.discriminator;
        form.name = this.name;

        return form;
    }
}