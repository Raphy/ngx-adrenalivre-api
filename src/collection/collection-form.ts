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

    populate(collection: Collection) {
        this.name = collection.name;
        if (collection.genre) {
            this.genre = collection.genre.id;
        }
        if (collection.backgroundFile) {
            this.backgroundFile = collection.backgroundFile.id;
        }
        this.synopsis = collection.synopsis;
        this.duration = collection.duration;
        this.pegi = collection.pegi;
        this.singleVolume = collection.singleVolume;
        if (collection.coverFile) {
            this.coverFile = collection.coverFile.id;
        }
    }
}