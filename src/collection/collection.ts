import { Author } from "../author";
import { File } from "../file";
import { Genre } from "../genre";
import { Volume } from '../volume/volume';

export class Collection {
    id: string;

    name: string;

    genre: Genre;

    backgroundFile: File;

    synopsis?: string;

    duration?: number;

    pegi?: number;

    singleVolume: boolean;

    recommendationRate: string;

    createdAt: string;

    updatedAt: string;

    volumes: Volume[];

    authors: Author[];

    coverFile: File;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        if (data.backgroundFile) {
            if (this.backgroundFile instanceof File) {
                this.backgroundFile.hydrate(data.backgroundFile);
            } else {
                this.backgroundFile = new File(data.backgroundFile);
            }
        }

        if (data.coverFile) {
            if (this.coverFile instanceof File) {
                this.coverFile.hydrate(data.coverFile);
            } else {
                this.coverFile = new File(data.coverFile);
            }
        }

        if (data.genre) {
            if (this.genre instanceof Genre) {
                this.genre.hydrate(data.genre);
            } else {
                this.genre = new Genre(data.genre);
            }
        }

        if (data.authors) {
            this.authors = data.authors.map((authorData) => new Author(authorData));
        }

        if (data.volumes) {
            this.volumes = data.volumes.map((volumeData) => new Volume(volumeData));
        }

        return this;
    }
}
