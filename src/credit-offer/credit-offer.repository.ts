import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { CreditOffer } from './credit-offer';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";

@Injectable()
export class CreditOfferRepository extends Repository<CreditOffer> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: CreditOffer | null = null): string {
        return 'creditOffers';
    }

    protected createItem(itemData: any = {}): CreditOffer {
        return new CreditOffer(itemData);
    }

    purchase(item: CreditOffer, stripeToken: string): Observable<void | Error> {
        return this.http.post(this.configuration.baseUrl + '/' + this.getEndpoint() + '/' + item.id + '/purchase', {stripeToken: stripeToken})
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
