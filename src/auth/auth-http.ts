import { Http, RequestOptionsArgs, Response, Request, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    updateHeaders(headers) {
        if (headers instanceof Headers || headers instanceof HttpHeaders) {
            if (headers.has('Authorization') === false) {
                const sessionId = localStorage.getItem('adrenalivre_session_id');
                if (sessionId) {
                    headers.set('Authorization', 'Bearer ' + sessionId);
                }
            }
        }
    }

    request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
        this.updateHeaders(url.headers);
        return super.request(url, options);
    }
}
