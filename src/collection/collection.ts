import { Author } from "../author";
import { File } from "../file";
import { Genre } from "../genre";
import { Volume } from '../volume/volume';
import { Model } from "../model";
import { CollectionRate } from "../rate";
import { CollectionVisit } from "../visit";

export class Collection extends Model {
    name?: string;

    genre?: Genre;

    desktopBackgroundFile?: File;

    synopsis?: string;

    duration?: number;

    pegi?: number;

    singleVolume?: boolean;

    recommendationRate?: string;

    createdAt: string;

    updatedAt?: string;

    volumes: Volume[] = [];

    authors: Author[] = [];

    coverFile: File;

    screenshots: File[] = [];

    mobileBackgroundFile?: File;

    websiteUrl?: string;

    visibility: string;

    rates: CollectionRate[] = [];

    visits: CollectionVisit[] = [];

    visitsDaysAgo: number;

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        if (!data) {
            return this;
        }

        if (data.desktopBackgroundFile) {
            if (this.desktopBackgroundFile instanceof File) {
                this.desktopBackgroundFile.hydrate(data.desktopBackgroundFile);
            } else {
                this.desktopBackgroundFile = new File(data.desktopBackgroundFile);
            }
        }

        if (data.mobileBackgroundFile) {
            if (this.mobileBackgroundFile instanceof File) {
                this.mobileBackgroundFile.hydrate(data.mobileBackgroundFile);
            } else {
                this.mobileBackgroundFile = new File(data.mobileBackgroundFile);
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

        if (data.rates) {
            this.rates = data.rates.map((rateDate => new CollectionRate(rateDate)));
        }

        if (data.visits) {
            this.visits = data.visits.map((visitDate => new CollectionVisit(visitDate)));
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
        if (this.mobileBackgroundFile) {
            form.mobileBackgroundFile = this.mobileBackgroundFile.id;
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
        form.websiteUrl = this.websiteUrl;
        form.visibility = this.visibility;

        return form;
    }
}
