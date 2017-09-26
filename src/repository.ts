import { Observable } from 'rxjs/Observable';

import { Form } from './form';
import { Error } from './error';
import { AuthHttp } from './auth';
import { Configuration } from './configuration';
import { Error, ErrorFactory } from './error';

export abstract class Repository<T>
{
    constructor(protected http: AuthHttp, protected configuration: Configuration) {
    }

    protected abstract getEndpoint(item: T | null = null): string;

    protected abstract createItem(itemData: any | null = null): T;

    list(params: object = {}): Observable<T[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/' + this.getEndpoint(), {params: params})
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
        return this.http.get(this.configuration.baseUrl + '/' + this.getEndpoint() + '/' + id)
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
        if (item && item.id) {
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

        return this.http.post(this.configuration.baseUrl + '/' + this.getEndpoint(item), item.toForm())
            .map((response: Response) => response.json())
            .map((data: object) => (item ? item : this.createItem()).hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    remove(item: T): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/' + this.getEndpoint() + '/' + item.id)
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