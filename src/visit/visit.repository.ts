import { Injectable, Inject,forwardRef } from "@angular/core";
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Visit } from './visit';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { VisitFactory } from "./visit-factory";

@Injectable()
export class VisitRepository implements Repository<Visit> {
    constructor(private http: AuthHttp, private configuration: Configuration, @Inject(forwardRef(() => VisitFactory)) private visitFactory: VisitFactory) {
    }

    public list(params: object = {}): Observable<Visit[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/visits', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((visitObject: any) => this.visitFactory.create(visitObject.discriminator, visitObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<Visit | Error> {
        return this.http.get(this.configuration.baseUrl + '/visits/' + id)
            .map((response: Response) => response.json())
            .map((data: any) => this.visitFactory.create(data.discriminator, data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(visit: Visit): Observable<Visit | Error> {
        if (visit.id) {
            return Observable.of(new Error({code: 400, message: 'An existing visit can not be saved'}));
        }

        return this.http.post(this.configuration.baseUrl + '/' + visit.discriminator + 's/' + visit[visit.discriminator].id + '/visit', visit)
            .map((response: Response) => response.json())
            .map((data: object) => visit.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(visit: Visit): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/visits/' + visit.id)
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
