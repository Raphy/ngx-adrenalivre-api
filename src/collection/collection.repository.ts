import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Collection } from './collection';
import { Repository } from "../repository";

@Injectable()
export class CollectionRepository extends Repository<Collection> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: Collection | null = null): string {
        return 'collections';
    }

    protected createItem(itemData: any = {}): Collection {
        return new Collection(itemData);
    }
}
