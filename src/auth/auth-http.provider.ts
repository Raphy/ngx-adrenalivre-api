import { Provider } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';

import { AuthHttp } from './auth-http';

export class AuthHttpProvider {
    static provide(): Provider {
        return {
            provide: AuthHttp,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new AuthHttp(backend, defaultOptions),
            deps: [
                XHRBackend,
                RequestOptions
            ]
        };
    }
}
