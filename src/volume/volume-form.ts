import { Volume } from "./volume";
import { Form } from "../form";

export class VolumeForm extends Form<Volume> {
    name: string;

    coverFile: string;

    backgroundFile: string;

    assetBundleFile: string;

    storyFile: string;

    collection: string;

    synopsis?: string;

    duration?: number;

    creditsCost: number;

    authors: string[];

    populate(item: Volume) {
        this.name = item.name;
        if (item.coverFile) {
            this.coverFile = item.coverFile.id;
        }
        if (item.collection) {
            this.collection = item.collection.id;
        }
        if (item.backgroundFile) {
            this.backgroundFile = item.backgroundFile.id;
        }
        if (item.assetBundleFile) {
            this.assetBundleFile = item.assetBundleFile.id;
        }
        if (item.storyFile) {
            this.storyFile = item.storyFile.id;
        }
        this.synopsis = item.synopsis;
        this.duration = item.duration;
        this.creditsCost = item.creditsCost;
        this.authors = item.authors.map((author) => author.id);

    }
}