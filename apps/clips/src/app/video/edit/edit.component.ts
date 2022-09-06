import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from '../../models/clip.model';
import { ClipService } from '../../services/clip.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ng-clips-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnChanges, OnDestroy {
  modalId = 'editClip';

  showAlert = false;
  inSubmission = false;
  alertColor = 'blue';
  alertMessage = 'Please wait! Updating clip.';

  clipId = new FormControl('', { nonNullable: true });
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  editForm = new FormGroup({
    id: this.clipId,
    title: this.title,
  });

  @Input()
  activeClip: IClip | null = null;

  @Output()
  update = new EventEmitter();

  constructor(
    private modalService: ModalService,
    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.modalService.register(this.modalId);
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    this.clipId.setValue(this.activeClip.docId as string);
    this.title.setValue(this.activeClip.title);
  }

  ngOnDestroy(): void {
    this.modalService.unregister(this.modalId);
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! Updating clip.';

    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value);
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMessage = 'Something went wrong. Try again later.';
      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMessage = 'Success!';
  }
}
