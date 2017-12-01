import { Rate } from "./rate";
import { Author } from "../author";

export class AuthorRate extends Rate {
    discriminator = 'author';

    author: Author;

    hydrate(data: any) {
        Object.assign(this, data);

        if (!data) {
            return this;
        }

        if (data.author) {
            if (this.author instanceof Author) {
                this.author.hydrate(data.author);
            } else {
                this.author = new Author(data.collection);
            }
        }

        return this;
    }
}