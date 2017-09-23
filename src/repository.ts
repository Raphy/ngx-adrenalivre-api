import { Observable } from 'rxjs/Observable';

import { Error } from './error';

export interface Repository<T>
{
    list(params: object = {}): Observable<T[] | Error>;

    retrieve(id: string): Observable<T | Error>;

    save(item: T): Observable<T | Error>;

    remove(item: T): Observable<void | Error>;
}