export abstract class Model {
    id: string;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        console.log('Model.hydrate', data);

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