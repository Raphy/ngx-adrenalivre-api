import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public baseUrl = 'https://api.adrenalivre.com';

    constructor(data: any = {}) {
        Object.assign(this, data);
    }
}
