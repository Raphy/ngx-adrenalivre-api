import { Provider } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';

import { AuthHttp } from './auth-http';

function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions)
{
    return new AuthHttp(backend, defaultOptions);
}

export class AuthHttpProvider {
    static provide(): Provider {
        return {
            provide: AuthHttp,
            useFactory: httpFactory,
            deps: [
                XHRBackend,
                RequestOptions
            ]
        };
    }
}
