import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { PromotionalCode } from './promotional-code';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { PromotionalCodeFactory } from "./promotional-code-factory";

@Injectable()
export class PromotionalCodeRepository extends Repository<PromotionalCode> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: PromotionalCode | null = null): string {
        return 'promotionalCodes';
    }

    protected createItem(itemData: any = {}): PromotionalCode {
        return PromotionalCodeFactory.create(itemData.discriminator, itemData);
    }

    public redeem(code: string): Observable<void | Error> {
        return this.http.post(this.configuration.baseUrl + '/' + this.getEndpoint() + '/' + code + '/redeem', null)
            .map((response: Response) => null)
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }
}
