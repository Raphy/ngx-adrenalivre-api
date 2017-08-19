import { Response } from '@angular/http';

import { Error } from './error';
import { ValidationError } from './validation-error';

export class ErrorFactory {
    static create(errorObject: any): Error | ValidationError {
        if (errorObject instanceof Response) {
            errorObject = errorObject.json();
        }

        if (errorObject.error) {
            errorObject = errorObject.error;
        }

        if (!errorObject.code || !errorObject.message) {
            return null;
        }

        if (errorObject.code === 400 && errorObject.message === 'Validation Error') {
            return new ValidationError(errorObject);
        }

        return new Error(errorObject);
    }
}
