import { Injectable, Inject,forwardRef } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

import { Session } from "../session";
import { AuthService } from "../auth/auth.service";
import { File } from "./file";
import { FileRepository } from "./file.repository";
import { Configuration } from "../configuration";
import { Error } from "../error";

@Injectable()
export class FileService {
    constructor(private fileRepository: FileRepository, private domSanitizer: DomSanitizer, private configuration: Configuration, @Inject(forwardRef(() => AuthService)) private authService: AuthService) {
    }

    updateUrl(file: File, download: boolean = false) {
        if (file && file.id && !file.url) {
            if (download) {
                this.fileRepository.getContents(file).subscribe((blob: Blob) => file.url = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)));
            } else {
                this.authService.getSession().subscribe((session: Session | Error) => {
                    if (session instanceof Session) {
                        file.url = this.configuration.baseUrl + '/files/' + file.id + '/contents?session=' + session.id
                    }
                });
            }
        }
    }
}