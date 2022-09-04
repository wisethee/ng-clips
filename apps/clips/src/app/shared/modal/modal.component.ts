import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ng-clips-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}

  chackModalVisibility() {
    return !this.modalService.isModalOpen();
  }

  closeModal() {
    this.modalService.toggleModal();
  }
}
