import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Slide } from './slide';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { SlideForm } from "./slide-form";

@Injectable()
export class SlideRepository implements Repository<Slide> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<Slide[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/slides', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((slideObject) => new Slide(slideObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<Slide | Error> {
        return this.http.get(this.configuration.baseUrl + '/slides/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new Slide(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(slideForm: SlideForm, slide: Slide = null): Observable<Slide | Error> {
        if (slide && slide.id) {
            return this.http.patch(this.configuration.baseUrl + '/slides/' + slide.id, slideForm)
                .map((response: Response) => response.json())
                .map((data: object) => slide.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/slides', slideForm)
            .map((response: Response) => response.json())
            .map((data: object) => slide.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(slide: Slide): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/slides/' + slide.id)
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
