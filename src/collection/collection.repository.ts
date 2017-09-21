import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Collection } from './collection';
import { Error, ErrorFactory } from '../error';

@Injectable()
export class CollectionRepository {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<Collection[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/collections', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((collectionObject) => new Collection(collectionObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<Collection | Error> {
        return this.http.get(this.configuration.baseUrl + '/collections/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new Collection(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(collection: Collection): Observable<Collection | Error> {
        if (collection.id) {
            return this.http.patch(this.configuration.baseUrl + '/collections/' + collection.id, collection)
                .map((response: Response) => response.json())
                .map((data: object) => collection.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/collections', collection)
            .map((response: Response) => response.json())
            .map((data: object) => collection.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(collection: Collection): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/collections/' + collection.id)
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
