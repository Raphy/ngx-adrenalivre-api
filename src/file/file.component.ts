import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { File } from './file';
import { FileService } from "./file.service";

@Component({
    selector: 'adrenalivre-file',
    templateUrl: './file.component.html'
})
export class FileComponent implements OnChanges {
    @Input() private file: File;
    private fileType: string;

    constructor(private fileService: FileService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.file = changes.file.currentValue;
        if (this.file && this.file.id) {
            if (this.file.mimeType && this.file.mimeType.startsWith('image/')) {
                this.fileType = 'image';
            }

            this.fileService.updateUrl(this.file)
        }
    }
}
