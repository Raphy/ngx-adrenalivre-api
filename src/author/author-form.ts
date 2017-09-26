import { Author } from "./author";
import { Form } from "../form";

export class AuthorForm extends Form<Author> {
    firstName: string;

    lastName: string;

    description?: string;

    profileImageFile: string;

    facebookUrl?: string;

    twitterUrl?: string;

    websiteUrl?: string;

    populate(item: Author) {
        this.firstName = item.firstName;
        this.lastName = item.lastName;
        this.description = item.description;
        if (item.profileImageFile) {
            this.profileImageFile = item.profileImageFile.id;
        }
        this.facebookUrl = item.facebookUrl;
        this.twitterUrl = item.twitterUrl;
        this.websiteUrl = item.websiteUrl;
    }
}