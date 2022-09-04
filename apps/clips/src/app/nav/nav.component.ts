import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'ng-clips-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public modalService: ModalService) {}

  openModal() {
    this.modalService.toggleModal('auth');

    return false;
  }
}
