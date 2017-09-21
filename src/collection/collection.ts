import { Author } from "../author";
import { File } from "../file";
import { Genre } from "../genre";
import { Volume } from "../volume";

export class Collection {
    public id: string;
    public name: string;
    public genre: Genre;
    public backgroundFile: File;
    public synopsis?: string;
    public duration?: number;
    public pegi?: number;
    public singleVolume: string;
    public recommendationRate: string;
    public createdAt: string;
    public updatedAt: string;
    public volumes: Volume[];
    public authors: Author[];
    public coverFile: File;

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
            this.authors = data.authors.map((authorData => new Author(authorData)));
        }

        if (data.volumes) {
            this.volumes = data.volumes.map((volumeData => new Volume(volumeData)));
        }

        return this;
    }
}
