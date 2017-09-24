export class CreditOffer {
    public id: string;

    public name: string;

    public credits: number;

    public price: number;

    public currency: string;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        return this;
    }
}
