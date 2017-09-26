import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth';
import { Configuration } from '../configuration';
import { Genre } from './genre';
import { Repository } from "../repository";

@Injectable()
export class GenreRepository extends Repository<Genre> {
    constructor(http: AuthHttp, configuration: Configuration) {
        super(http, configuration);
    }

    protected getEndpoint(item: Genre | null = null): string {
        return 'genres';
    }

    protected createItem(itemData: any = {}): Genre {
        return new Genre(itemData);
    }
}
