import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Genre } from './genre';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { GenreForm } from "./genre-form";

@Injectable()
export class GenreRepository implements Repository<Genre> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<Genre[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/genres', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((genreObject) => new Genre(genreObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<Genre | Error> {
        return this.http.get(this.configuration.baseUrl + '/genres/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new Genre(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(genreForm: GenreForm, genre: Genre = null): Observable<Genre | Error> {
        if (genre && genre.id) {
            return this.http.patch(this.configuration.baseUrl + '/genres/' + genre.id, genreForm)
                .map((response: Response) => response.json())
                .map((data: object) => genre.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/genres', genreForm)
            .map((response: Response) => response.json())
            .map((data: object) => genre.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(genre: Genre): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/genres/' + genre.id)
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
