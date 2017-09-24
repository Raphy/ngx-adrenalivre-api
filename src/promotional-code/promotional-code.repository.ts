import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { PromotionalCode } from './promotional-code';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { PromotionalCodeFactory } from "./promotional-code-factory";

@Injectable()
export class PromotionalCodeRepository implements Repository<PromotionalCode> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<PromotionalCode[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/promotionalCodes', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((promotionalCodeObject: any) => PromotionalCodeFactory.create(promotionalCodeObject.discriminator, promotionalCodeObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<PromotionalCode | Error> {
        return this.http.get(this.configuration.baseUrl + '/promotionalCodes/' + id)
            .map((response: Response) => response.json())
            .map((data: any) => PromotionalCodeFactory.create(data.discriminator, data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(promotionalCode: PromotionalCode): Observable<PromotionalCode | Error> {
        if (promotionalCode.id) {
            return this.http.patch(this.configuration.baseUrl + '/promotionalCodes/' + promotionalCode.id, promotionalCode)
                .map((response: Response) => response.json())
                .map((data: object) => promotionalCode.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/promotionalCodes', promotionalCode)
            .map((response: Response) => response.json())
            .map((data: object) => promotionalCode.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(promotionalCode: PromotionalCode): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/promotionalCodes/' + promotionalCode.id)
            .map((response: Response) => null)
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public redeem(code: string): Observable<void | Error> {
        return this.http.post(this.configuration.baseUrl + '/creditOffers/' + code + '/redeem', null)
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
