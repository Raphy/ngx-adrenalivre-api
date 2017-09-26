import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { CreditReload } from './credit-reload';
import { Repository } from "../repository";
import { CreditReloadFactory } from "./credit-reload-factory";

@Injectable()
export class CreditReloadRepository extends Repository<CreditReload> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: CreditReload | null = null): string {
        return 'creditReloads';
    }

    protected createItem(itemData: any = {}): CreditReload {
        return CreditReloadFactory.create(itemData.discriminator, itemData);
    }
}
