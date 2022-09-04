import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ng-clips-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  constructor(public modalService: ModalService) {}

  closeModal() {
    this.modalService.toggleModal();
  }
}
