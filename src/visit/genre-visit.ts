import { Genre } from '../genre';
import { Visit } from "./visit";

export class GenreVisit extends Visit {

    public discriminator: string = 'genre';

    public genre: Genre;

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
}