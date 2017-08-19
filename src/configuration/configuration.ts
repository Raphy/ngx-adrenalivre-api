import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public baseUrl;

    constructor(data: any = {}) {
        Object.assign(this, data);
    }
}
