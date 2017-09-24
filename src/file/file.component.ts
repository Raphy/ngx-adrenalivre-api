import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { File } from './file';
import { FileService } from "./file.service";

@Component({
    selector: 'adrenalivre-file',
    templateUrl: './file.component.html'
})
export class FileComponent implements OnChanges {
    @Input() private file: File;

    @Input() private videoProperties: any;

    @Input() private imageProperties: any = {

    };

    private fileType: string;

    constructor(private fileService: FileService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.file = changes.file.currentValue;
        this.videoProperties = changes.videoProperties.currentValue;
        this.imageProperties = changes.imageProperties.currentValue;

        if (this.file && this.file.id) {
            if (this.file.mimeType && this.file.mimeType.startsWith('image/')) {
                this.fileType = 'image';
            } else  if (this.file.mimeType && this.file.mimeType.startsWith('video/')) {
                this.fileType = 'video';
            }

            this.fileService.updateUrl(this.file)
        }
    }
}
