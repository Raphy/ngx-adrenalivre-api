import { Form } from "./form";

export abstract class Model {
    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        return this;
    }

    abstract toForm(): Form;
}