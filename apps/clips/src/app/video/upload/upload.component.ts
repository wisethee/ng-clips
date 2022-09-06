import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'ng-clips-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  isDragover = false;
  file: File | null = null;
  nextStep = false;

  showAlert = false;
  alertColor = 'blue';
  alertMessage = 'Please wait! Your clip is being uploaded.';
  inSubmission = false;

  showPercentage = false;
  percentage = 0;

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  uploadForm = new FormGroup({
    title: this.title,
  });

  constructor(private storage: AngularFireStorage) {}

  storeFile(event: Event) {
    this.isDragover = false;

    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));

    this.nextStep = true;
  }

  uploadFile() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! Your clip is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const task = this.storage.upload(clipPath, this.file);
    task
      .percentageChanges()
      .subscribe((progress) => (this.percentage = (progress as number) / 100));

    task
      .snapshotChanges()
      .pipe(last())
      .subscribe({
        next: () => {
          this.alertColor = 'green';
          this.alertMessage = 'Success!, Your clip is uploaded.';
          this.showPercentage = false;
        },
        error: (error) => {
          this.alertColor = 'red';
          this.alertMessage = 'Upload failed! Please try again later.';
          this.inSubmission = true;
          this.showPercentage = false;
          console.log(error);
        },
      });
  }
}
