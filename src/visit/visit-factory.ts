import { Injectable } from '@angular/core';

import { Visit } from "./visit";
import { AuthorVisit } from "./author-visit";
import { CollectionVisit } from "./collection-visit";
import { GenreVisit } from "./genre-visit";
import { VolumeVisit } from "./volume-visit";

@Injectable()
export class VisitFactory {
    public static create(discriminator: string, data: any = {}): Visit
    {
        switch (discriminator) {
            case 'author':
                return new AuthorVisit(data);
                break;
            case 'collection':
                return new CollectionVisit(data);
                break;
            case 'genre':
                return new GenreVisit(data);
                break;
            case 'volume':
                return new VolumeVisit(data);
                break;
            default:
                throw new Error('The visit discriminator "' + discriminator + '" is not handled');
                break;
        }
    }
}