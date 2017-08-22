import { Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

import { FileRepository } from "./file.repository";
import { File } from "./file";

@Injectable()
export class FileService {
    constructor(private fileRepository: FileRepository, private domSanitizer: DomSanitizer){
    }

    updateUrl(file: File) {
        if (file && file.id) {
            this.fileRepository.getContents(file).subscribe((blob: Blob) => file.url = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)));
        }
    }
}