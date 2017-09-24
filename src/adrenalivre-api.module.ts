import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthService, AuthHttpProvider } from './auth';
import { SessionRepository } from './session';
import { UserRepository } from './user';
import { FileComponent, FileRepository, FileService } from './file';
import { SlideRepository } from './slide';
import { AuthorRepository } from './author';
import { GenreRepository } from './genre';
import { CreditOfferRepository } from "./credit-offer/credit-offer.repository";
import { CollectionRepository } from "./collection/collection.repository";

const ADRENALIVRE_COMPONENTS = [
    FileComponent
];

const ADRENALIVRE_PROVIDERS = [
    AuthHttpProvider.provide(),
    FileService,
    SessionRepository,
    AuthService,
    UserRepository,
    FileRepository,
    SlideRepository,
    AuthorRepository,
    GenreRepository,
    CollectionRepository,
    VolumeRepository,
    CreditOfferRepository,
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    exports: ADRENALIVRE_COMPONENTS,
    declarations: ADRENALIVRE_COMPONENTS,
    providers: ADRENALIVRE_PROVIDERS,
})
export class AdrenalivreAPIModule {
}
