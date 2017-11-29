import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    baseUrl: string = 'https://api.adrenalivre.com';

    debug: boolean = false;

    constructor(data: any = {}) {
        Object.assign(this, data);
    }
}
