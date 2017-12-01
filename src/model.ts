export abstract class Model {
    id: string;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        if (!data) {
            return this;
        }
        
        Object.assign(this, data);

        return this;
    }

    toForm(): object {
        let form: any = {};

        if (this.id) {
            form.id = this.id;
        }

        return form;
    };
}