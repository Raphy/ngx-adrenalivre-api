import { Collection } from "./collection";
import { Form } from "../form";

export class CollectionForm extends Form<Collection> {
    name: string;

    genre: string;

    backgroundFile: string;

    synopsis?: string;

    duration?: number;

    pegi?: number;

    singleVolume: boolean;

    coverFile: string;

    populate(item: Collection) {
        this.name = item.name;
        if (item.genre) {
            this.genre = item.genre.id;
        }
        if (item.backgroundFile) {
            this.backgroundFile = item.backgroundFile.id;
        }
        this.synopsis = item.synopsis;
        this.duration = item.duration;
        this.pegi = item.pegi;
        this.singleVolume = item.singleVolume;
        if (item.coverFile) {
            this.coverFile = item.coverFile.id;
        }
    }
}