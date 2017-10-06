import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import { AuthHttp } from './auth';
import { Configuration } from './configuration';
import { Error, ErrorFactory } from './error';
import { Model } from "./model";

export abstract class Repository<T extends Model> {
    constructor(protected http: AuthHttp, protected configuration: Configuration) {
    }

    protected abstract getEndpoint(item: T | null): string;

    protected abstract createItem(itemData: any | null): T;

    list(params: object = {}): Observable<T[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/' + this.getEndpoint(null), {params: params})
            .map((response: Response) => {
                console.log('Repository List Response', response);

                return response.json();
            })
            .map((data: object[]) => {
                console.log('Repository List Before Map', data);

                let items = data.map((itemData) => this.createItem(itemData));

                if (this.configuration.debug) {
                    console.log('Repository List After Map', items);
                }

                return items;
            })
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    retrieve(id: string): Observable<T | Error> {
        return this.http.get(this.configuration.baseUrl + '/' + this.getEndpoint(null) + '/' + id)
            .map((response: Response) => {
                console.log('Repository Retrieve Response', response);

                return response.json();
            })
            .map((itemData: object) => {
                if (this.configuration.debug) {
                    console.log('Repository Retrieve Before Map', itemData);
                }

                let item = this.createItem(itemData);

                if (this.configuration.debug) {
                    console.log('Repository Retrieve After Map', item);
                }

                return item;
            })
            .do((item) => {

            })
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    save(item: T): Observable<T | Error> {
        if (item && item.id) {
            return this.http.patch(this.configuration.baseUrl + '/' + this.getEndpoint(item) + '/' + item.id, item.toForm())
                .map((response: Response) => response.json())
                .map((data: object) => item.hydrate(data))
                .do((res) => {
                    if (this.configuration.debug) {
                        console.log('Repository Save after Map', res);
                    }
                })
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/' + this.getEndpoint(item), item.toForm())
            .map((response: Response) => response.json())
            .map((data: object) => item ? item.hydrate(data) : this.createItem(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    remove(item: T): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/' + this.getEndpoint(null) + '/' + item.id)
            .map((response: Response) => null)
            .do(() => {
                if (this.configuration.debug) {
                    console.log('Repository Delete', item);
                }
            })
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }
}