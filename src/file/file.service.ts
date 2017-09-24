import { Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

import { FileRepository } from "./file.repository";
import { File } from "./file";
import { AuthService } from "../auth";
import { Session } from "../session/session";
import { Configuration } from "../configuration";

@Injectable()
export class FileService {
    constructor(private fileRepository: FileRepository, private domSanitizer: DomSanitizer, private configuration: Configuration, private authService: AuthService) {
    }

    updateUrl(file: File, download: boolean = false) {
        if (file && file.id && file.url === null) {
            if (download) {
                this.fileRepository.getContents(file).subscribe((blob: Blob) => file.url = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)));
            } else {
                this.authService.getSession().subscribe((session: Session | Error) => {
                    if (session instanceof Session) {
                        file.url = this.configuration.baseUrl + '/' + file.id + '/contents?session=' + session.id
                    }
                });
            }
        }
    }
}