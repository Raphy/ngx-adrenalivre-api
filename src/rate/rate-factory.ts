import { Injectable } from '@angular/core';

import { Rate } from "./rate";
import { CollectionRate } from "./collection-rate";
import { AuthorRate } from "./author-rate";
import { VolumeRate } from "./volume-rate";

@Injectable()
export class RateFactory {
    public static create(discriminator: string, data: any = {}): Rate
    {
        switch (discriminator) {
            case 'collection':
                return new CollectionRate(data);
            case 'author':
                return new AuthorRate(data);
            case 'volume':
                return new VolumeRate(data);
            default:
                throw new Error('The rate discriminator "' + discriminator + '" is not handled');
        }
    }
}