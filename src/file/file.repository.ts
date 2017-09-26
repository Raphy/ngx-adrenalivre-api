import { Injectable } from '@angular/core';
import { Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { File } from './file';
import { Error, ErrorFactory } from '../error';
import { Repository } from "../repository";
import { FileForm } from "./file-form";

@Injectable()
export class FileRepository implements Repository<File> {
    constructor(private http: AuthHttp, private configuration: Configuration) {
    }

    public list(params: object = {}): Observable<File[] | Error> {
        return this.http.get(this.configuration.baseUrl + '/files', {params: params})
            .map((response: Response) => response.json())
            .map((data: object[]) => data.map((fileObject) => new File(fileObject)))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public retrieve(id: string): Observable<File | Error> {
        return this.http.get(this.configuration.baseUrl + '/files/' + id)
            .map((response: Response) => response.json())
            .map((data: object) => new File(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public save(fileForm: FileForm, file: File = null): Observable<File | Error> {
        if (file && file.id) {
            return this.http.patch(this.configuration.baseUrl + '/files/' + file.id, fileForm)
                .map((response: Response) => response.json())
                .map((data: object) => file.hydrate(data))
                .catch((errorCaught: any) => {
                    const error = ErrorFactory.create(errorCaught);
                    if (error) {
                        return Observable.of(error);
                    }

                    throw errorCaught;
                });
        }

        return this.http.post(this.configuration.baseUrl + '/files', fileForm)
            .map((response: Response) => response.json())
            .map((data: object) => file.hydrate(data))
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public remove(file: File): Observable<void | Error> {
        return this.http.delete(this.configuration.baseUrl + '/files/' + file.id)
            .map((response: Response) => null)
            .catch((errorCaught: any) => {
                const error = ErrorFactory.create(errorCaught);
                if (error) {
                    return Observable.of(error);
                }

                throw errorCaught;
            });
    }

    public saveContents(file: File): Observable<null> {
        const formData: FormData = new FormData();
        formData.append('contents', file.contents.file, file.contents.name);
        const headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        return this.http.post(this.configuration.baseUrl + '/files/' + file.id + '/contents', formData, {headers: headers})
            .map((response: Response) => null);
    }

    public getContents(file: File): Observable<Blob | Error> {
        return this.http.get(this.configuration.baseUrl + '/files/' + file.id + '/contents', {responseType: ResponseContentType.Blob})
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
