import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { CreditReload } from './credit-reload';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { CreditReloadFactory } from "./credit-reload-factory";

@Injectable()
export class CreditReloadRepository implements Repository<CreditReload> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<CreditReload[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/creditReloads', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((creditReloadObject: any) => CreditReloadFactory.create(creditReloadObject.discriminator, creditReloadObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<CreditReload | Error> {
        return this.http.get(this.configuration.baseUrl + '/creditReloads/' + id)
            .map((response: Response) => response.json())
            .map((data: any) => CreditReloadFactory.create(data.discriminator, data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(creditReload: CreditReload): Observable<CreditReload | Error> {
        if (creditReload.id) {
            return this.http.patch(this.configuration.baseUrl + '/creditReloads/' + creditReload.id, creditReload)
                .map((response: Response) => response.json())
                .map((data: object) => creditReload.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/creditReloads', creditReload)
            .map((response: Response) => response.json())
            .map((data: object) => creditReload.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(creditReload: CreditReload): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/creditReloads/' + creditReload.id)
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
