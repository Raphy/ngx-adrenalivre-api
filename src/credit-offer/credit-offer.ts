export class CreditOffer {
    id: string;

    name: string;

    credits: number;

    price: number;

    currency: string;

    constructor(data: any = {}) {
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        return this;
    }
}
