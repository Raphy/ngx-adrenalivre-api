import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Slide } from './slide';
import { Repository } from "../repository";

@Injectable()
export class SlideRepository extends Repository<Slide> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: Slide | null = null): string {
        return 'slides';
    }

    protected createItem(itemData: any = {}): Slide {
        return new Slide(itemData);
    }
}
