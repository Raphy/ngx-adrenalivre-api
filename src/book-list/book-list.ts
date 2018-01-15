import { Model } from "../model";

export abstract class BookList extends Model {
    discriminator: string;

    name: string;

    position: number;

    toForm(): object {
        let form: any = super.toForm();

        form.discriminator = this.discriminator;
        form.name = this.name;
        form.position = this.position;

        return form;
    }
}