import { Injectable } from '@angular/core';
import { Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { File } from './file';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { HttpClient, HttpRequest } from "@angular/common/http";

@Injectable()
export class FileRepository extends Repository<File> {
    constructor(http: AuthHttp, configuration: Configuration, private httpClient: HttpClient) {
        super(http, configuration);
    }

    protected getEndpoint(item: File | null = null): string {
        return 'files';
    }

    protected createItem(itemData: any = {}): File {
        return new File(itemData);
    }

    public saveContents(file: File): Observable<null> {
        const formData: FormData = new FormData();
        formData.append('contents', file.contents, file.contents.name);

        let req = new HttpRequest('POST', this.configuration.baseUrl + '/' + this.getEndpoint() + '/' + file.id + '/contents', formData, {reportProgress: true});
        this.http.updateHeaders(req.headers);

        return this.httpClient.request(req);
    }

    public getContents(file: File): Observable<Blob | Error> {
        return this.http.get(this.configuration.baseUrl + '/' + this.getEndpoint() + '/' + file.id + '/contents', {responseType: ResponseContentType.Blob})
            .map((response: Response) => response.blob())
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }
}
