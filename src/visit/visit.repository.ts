import { Injectable } from "@angular/core";
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Visit } from './visit';
import { Repository } from "../repository";
import { VisitFactory } from "./visit-factory";

@Injectable()
export class VisitRepository extends Repository<Visit> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: Visit | null = null): string {
        if (item) {
            return item.discriminator + 's';
        }

        return 'visits';
    }

    protected createItem(itemData: any = {}): Visit {
        return new VisitFactory.create(itemData.discriminator, itemData);
    }
}
