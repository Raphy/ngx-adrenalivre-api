import { File } from "../file";
import { Model } from "../model";
import { GenreVisit } from "../visit";

export class Genre extends Model {
    name: string;

    illustrationFile: File;

    visits: GenreVisit[] = [];

    constructor(data: any = {}) {
        super();
        this.hydrate(data);
    }

    hydrate(data: any) {
        super.hydrate(data);

        if (data.illustrationFile) {
            if (this.illustrationFile instanceof File) {
                this.illustrationFile.hydrate(data.illustrationFile);
            } else {
                this.illustrationFile = new File(data.illustrationFile);
            }
        }

        if (data.visits) {
            this.visits = data.visits.map((visitDate => new GenreVisit(visitDate)));
        }

        return this;
    }

    toForm(): object {
        let form: any = super.toForm();

        form.name = this.name;
        if (this.illustrationFile) {
            form.illustrationFile = this.illustrationFile.id;
        }

        return form;
    }
}
