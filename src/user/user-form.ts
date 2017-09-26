import { User } from "./user";
import { Form } from "../form";

export class UserForm extends Form<User> {
    emailAddress: string;

    plainPassword: string;

    firstName: string;

    lastName: string;

    profilePhotoFile: string;

    populate(item: User) {
        this.emailAddress = item.emailAddress;
        this.plainPassword = item.plainPassword;
        this.firstName = item.firstName;
        if (item.profilePhotoFile) {
            this.profilePhotoFile = item.profilePhotoFile.id;
        }
    }
}