import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from '../../models/clip.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ng-clips-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnChanges, OnDestroy {
  modalId = 'editClip';

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

  constructor(private modalService: ModalService) {}

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
}
