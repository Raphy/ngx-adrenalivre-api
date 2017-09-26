import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Volume } from './volume';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";

@Injectable()
export class VolumeRepository extends Repository<Volume> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: Volume | null = null): string {
          return 'volumes';
    }

    protected createItem(itemData: any = {}): Volume {
        return new Volume(itemData);
    }

    buy(item: Volume): Observable<void | Error> {
        return this.http.post(this.configuration.baseUrl + '/' + this.getEndpoint() + '/' + item.id + '/buy', null)
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
