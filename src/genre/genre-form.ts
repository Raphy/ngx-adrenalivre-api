import { Genre } from "./genre";
import { Form } from "../form";

export class GenreForm extends Form<Genre> {
    name: string;

    illustrationFile: string;

    populate(item: Genre) {
        this.name = item.name;
        if (item.illustrationFile) {
            this.illustrationFile = item.illustrationFile.id;
        }
    }
}