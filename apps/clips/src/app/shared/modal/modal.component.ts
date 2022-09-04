import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ng-clips-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input()
  modalId = '';

  constructor(public modalService: ModalService) {}

  chackModalVisibility() {
    return !this.modalService.isModalOpen(this.modalId);
  }

  closeModal() {
    this.modalService.toggleModal(this.modalId);
  }
}
