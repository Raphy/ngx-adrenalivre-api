import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    baseUrl = 'https://api.adrenalivre.com';

    constructor(data: any = {}) {
        Object.assign(this, data);
    }
}
