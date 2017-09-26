import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Volume } from '../volume/volume';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { VolumeForm } from "./volume-form";

@Injectable()
export class VolumeRepository implements Repository<Volume> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<Volume[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/volumes', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((volumeObject) => new Volume(volumeObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<Volume | Error> {
        return this.http.get(this.configuration.baseUrl + '/volumes/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new Volume(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(volumeForm: VolumeForm, volume: Volume = null): Observable<Volume | Error> {
        if (volume && volume.id) {
            return this.http.patch(this.configuration.baseUrl + '/volumes/' + volume.id, volumeForm)
                .map((response: Response) => response.json())
                .map((data: object) => volume.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/volumes', volumeForm)
            .map((response: Response) => response.json())
            .map((data: object) => volume.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(volume: Volume): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/volumes/' + volume.id)
            .map((response: Response) => null)
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public buy(volume: Volume): Observable<void | Error> {
        return this.http.post(this.configuration.baseUrl + '/volumes/' + volume.id + '/buy', null)
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
