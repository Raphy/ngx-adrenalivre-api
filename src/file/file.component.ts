import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser'

import { File } from './file';
import { FileRepository } from "./file.repository";
import { FileService } from "./file.service";

@Component({
    selector: 'adrenalivre-file',
    templateUrl: './file.component.html'
})
export class FileComponent implements OnInit, OnChanges {
    @Input() private file: File;
    private fileType: string;
    private url: SafeResourceUrl;

    constructor(private fileRepository: FileRepository, private fileService: FileService) {
    }

    ngOnInit(): void {
        // if (this.file.mimeType.startsWith('image/')) {
        //     this.fileType = 'image';
        // }
        // this.fileContentsUrl = this.configuration.baseUrl + '/files/' + this.file.id + '/contents';
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.file = changes.file.currentValue;
        if (this.file && this.file.id) {
            if (this.file.mimeType && this.file.mimeType.startsWith('image/')) {
                this.fileType = 'image';
            }

            this.fileService.getUrl(this.file).subscribe((url: string) => this.url = url);
        }
    }
}
