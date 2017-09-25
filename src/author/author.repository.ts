import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Author } from './author';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";

@Injectable()
export class AuthorRepository implements Repository<Author> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    list(params: object = {}): Observable<Author[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/authors', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((authorObject) => new Author(authorObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    retrieve(id: string): Observable<Author | Error> {
        return this.http.get(this.configuration.baseUrl + '/authors/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new Author(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    save(author: Author): Observable<Author | Error> {
        if (author.id) {
            return this.http.patch(this.configuration.baseUrl + '/authors/' + author.id, author)
                .map((response: Response) => response.json())
                .map((data: object) => author.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/authors', author)
            .map((response: Response) => response.json())
            .map((data: object) => author.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    remove(author: Author): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/authors/' + author.id)
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
