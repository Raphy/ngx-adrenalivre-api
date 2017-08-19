export class Error {
    code: number;
    message: string;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        return this;
    }
}
