import { Component } from '@angular/core';

@Component({
  selector: 'ng-clips-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  isDragover = false;

  storeFile(event: Event) {
    this.isDragover = false;
  }
}
