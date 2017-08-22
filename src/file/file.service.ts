import { Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from "rxjs/Rx";

import { FileRepository } from "./file.repository";
import { File } from "./file";

@Injectable()
export class FileService {
    constructor(private fileRepository: FileRepository, private domSanitizer: DomSanitizer){
    }

    getUrl(file: File): Observable<SafeResourceUrl> {
        return this.fileRepository.getContents(file).map((blob: Blob) => this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)));
    }
}