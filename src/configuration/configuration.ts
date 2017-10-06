import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    baseUrl: string = 'https://api.adrenalivre.com';

    constructor(data: any = {}) {
        Object.assign(this, data);
    }
}
