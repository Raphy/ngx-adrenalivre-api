import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthService, AuthHttpProvider } from './auth';
import { SessionRepository } from './session';
import { UserRepository } from './user';
import { FileComponent, FileRepository, FileService } from './file';
import { SlideRepository } from './slide';
import { VisitFactory, VisitRepository } from './visit';
import { AuthorRepository } from './author';
import { GenreRepository } from './genre';
import { CreditOfferRepository } from "./credit-offer";
import { CollectionRepository } from "./collection";
import { VolumeRepository } from "./volume";
import { CreditReloadFactory, CreditReloadRepository } from "./credit-reload";
import { PromotionalCodeFactory, PromotionalCodeRepository } from "./promotional-code";

const ADRENALIVRE_COMPONENTS = [
    FileComponent
];

const ADRENALIVRE_PROVIDERS = [
    AuthHttpProvider.provide(),
    SessionRepository,
    AuthService,
    UserRepository,
    FileRepository,
    FileService,
    SlideRepository,
    VisitFactory,
    VisitRepository,
    AuthorRepository,
    GenreRepository,
    CollectionRepository,
    VolumeRepository,
    CreditOfferRepository,
    CreditReloadFactory,
    CreditReloadRepository,
    PromotionalCodeFactory,
    PromotionalCodeRepository
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
