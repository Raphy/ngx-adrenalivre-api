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
        if (this.configuration.debug) {
            console.log(this.constructor.name + ' // List // QueryParameters', params);
        }

        return this.http.get(this.configuration.baseUrl + '/' + this.getEndpoint(null), {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((itemData) => this.createItem(itemData)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    retrieve(id: string): Observable<T | Error> {
        if (this.configuration.debug) {
            console.log(this.constructor.name + ' // Retrieve // ID', id);
        }

        return this.http.get(this.configuration.baseUrl + '/' + this.getEndpoint(null) + '/' + id)
            .map((response: Response) => response.json())
            .map((itemData: object) => this.createItem(itemData))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    save(item: T): Observable<T | Error> {
        if (this.configuration.debug) {
            console.log(this.constructor.name + ' // Save // Payload', item.toForm());
        }

        if (item && item.id) {
            if (this.configuration.debug) {
                console.log(this.constructor.name + ' // Save // Using PATCH method');
            }

            return this.http.patch(this.configuration.baseUrl + '/' + this.getEndpoint(item) + '/' + item.id, item.toForm())
                .map((response: Response) => response.json())
                .map((data: object) => item.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        if (this.configuration.debug) {
            console.log(this.constructor.name + ' // Save // Using POST method');
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
        if (this.configuration.debug) {
            console.log(this.constructor.name + ' // Remove // ID', item.id);
        }

        return this.http.delete(this.configuration.baseUrl + '/' + this.getEndpoint(null) + '/' + item.id)
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