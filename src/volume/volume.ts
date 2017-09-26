import { Author } from "../author";
import { File } from "../file";
import { Collection } from "../collection";
import { VolumeForm } from "./volume-form";
import { Model } from "../model";

export class Volume extends Model {
    name?: string;

    coverFile: File;

    backgroundFile: File;

    assetBundleFile: File;

    storyFile: File;

    collection: Collection;

    synopsis?: string;

    duration?: number;

    creditsCost: number;

    recommendationRate: string;

    createdAt: string;

    updatedAt: string;

    authors: Author[];

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

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

        if (data.assetBundleFile) {
            if (this.assetBundleFile instanceof File) {
                this.assetBundleFile.hydrate(data.assetBundleFile);
            } else {
                this.assetBundleFile = new File(data.assetBundleFile);
            }
        }

        if (data.storyFile) {
            if (this.storyFile instanceof File) {
                this.storyFile.hydrate(data.storyFile);
            } else {
                this.storyFile = new File(data.storyFile);
            }
        }

        if (data.collection) {
            if (this.collection instanceof Collection) {
                this.collection.hydrate(data.collection);
            } else {
                this.collection = new Collection(data.collection);
            }
        }

        if (data.authors) {
            this.authors = data.authors.map((authorData => new Author(authorData)));
        }

        return this;
    }

    toForm(): VolumeForm {
        let form = new VolumeForm();
        form.populate(this);

        return form;
    }
}
