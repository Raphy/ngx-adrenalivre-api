import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { File } from './file';
import { FileService } from "./file.service";

@Component({
    selector: 'adrenalivre-file',
    templateUrl: './file.component.html'
})
export class FileComponent implements OnChanges {
    @Input() private file: File;

    @Input() private videoAttributes: any = {
        autoplay: false,
        controls: true,
        muted: false,
        classes: null,
        width: null,
        height: null,
    };

    @Input() private imageAttributes: any = {
        classes: null,
        width: null,
        height: null,
    };

    private fileType: string;

    constructor(private fileService: FileService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.file) {
            this.file = changes.file.currentValue;

            if (this.file && this.file.id) {
                if (this.file.mimeType && this.file.mimeType.startsWith('image/')) {
                    this.fileType = 'image';
                } else if (this.file.mimeType && this.file.mimeType.startsWith('video/')) {
                    this.fileType = 'video';
                }

                this.fileService.updateUrl(this.file)
            }
        }

        if (changes.videoAttributes) {
            this.videoAttributes = changes.videoAttributes.currentValue;
        }

        if (changes.imageAttributes) {
            this.imageAttributes = changes.imageAttributes.currentValue;
        }
    }
}
