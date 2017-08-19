import { Error } from './error';
import { ValidationErrorItem } from './validation-error-item';

export class ValidationError extends Error {
    errors: ValidationErrorItem[];

    constructor(data: any = {}) {
        super(data);
        this.hydrate(data);
    }

    hydrate(data: any) {
        Object.assign(this, data);

        this.errors = [];
        if (data.errors && data.errors.length > 0) {
            this.errors = data.errors.map((errorItemObject) => new ValidationErrorItem(errorItemObject))
        }

        return this;
    }
}
