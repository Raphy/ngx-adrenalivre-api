import { Author } from "../author";
import { File } from "../file";
import { Genre } from "../genre";
import { Volume } from '../volume/volume';
import { Model } from "../model";

export class Collection extends Model {
    name: string;

    genre: Genre;

    desktopBackgroundFile: File;

    synopsis?: string;

    duration?: number;

    pegi?: number;

    singleVolume: boolean;

    recommendationRate: string;

    createdAt: string;

    updatedAt: string;

    volumes: Volume[] = [];

    authors: Author[] = [];

    coverFile: File;

    screenshots: File[] = [];

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        if (data.desktopBackgroundFile) {
            if (this.desktopBackgroundFile instanceof File) {
                this.desktopBackgroundFile.hydrate(data.desktopBackgroundFile);
            } else {
                this.desktopBackgroundFile = new File(data.desktopBackgroundFile);
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

        if (data.screenshots) {
            this.screenshots = data.screenshots.map((fileData) => new File(fileData));
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        form.name = this.name;
        if (this.genre) {
            form.genre = this.genre.id;
        }
        if (this.desktopBackgroundFile) {
            form.desktopBackgroundFile = this.desktopBackgroundFile.id;
        }
        form.synopsis = this.synopsis;
        form.duration = this.duration;
        form.pegi = this.pegi;
        form.singleVolume = this.singleVolume;
        if (this.coverFile) {
            form.coverFile = this.coverFile.id;
        }
        form.screenshots = this.screenshots.map((file?: File) => {
            if (file) {
                return file.id
            }
        });

        return form;
    }
}
