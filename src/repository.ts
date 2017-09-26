import { Observable } from 'rxjs/Observable';

import { Form } from './form';
import { Error } from './error';

export interface Repository<T>
{
    list(params: object): Observable<T[] | Error>;

    retrieve(id: string): Observable<T | Error>;

    save(itemForm: Form<T>, item: T): Observable<T | Error>;

    remove(item: T): Observable<void | Error>;
}