import { Slide } from "./slide";
import { Form } from "../form";

export class SlideForm extends Form<Slide> {
    title: string;

    description: string;

    position: number;

    backgroundFile: string;

    populate(item: Slide) {
        this.title = item.title;
        this.description = item.description;
        this.position = item.position;
        if (item.backgroundFile) {
            this.backgroundFile = item.backgroundFile.id;
        }
    }
}