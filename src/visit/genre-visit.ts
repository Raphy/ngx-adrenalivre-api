import { Genre } from '../genre';
import { Visit } from "./visit";

export class GenreVisit extends Visit {
    discriminator: string = 'genre';

    genre: Genre;

    hydrate(data: any) {
        if (data.genre) {
            if (this.genre instanceof Genre) {
                this.genre.hydrate(data.genre);
            } else {
                this.genre = new Genre(data.genre);
            }
        }

        return super.hydrate(data);
    }

    toForm(): object {
        let form: any = super.toForm();

        if (this.genre) {
            form.genre = this.genre.id;
        }

        return form;
    }
}