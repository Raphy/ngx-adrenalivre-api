import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthService, AuthHttpProvider } from './auth';
import { SessionRepository } from './session';
import { UserRepository } from './user';
import { FileComponent, FileRepository } from './file';
import { SlideRepository } from './slide';
import { AuthorRepository } from './author';

const ADRENALIVRE_COMPONENTS = [
    FileComponent
];

const ADRENALIVRE_PROVIDERS = [
    AuthHttpProvider.provide(),
    SessionRepository,
    AuthService,
    UserRepository,
    FileRepository,
    SlideRepository,
    AuthorRepository
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
