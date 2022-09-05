import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'ng-clips-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    public modalService: ModalService,
    public authService: AuthService
  ) {}

  openModal() {
    this.modalService.toggleModal('auth');

    return false;
  }

  logout() {
    this.authService.logout();
    return false;
  }
}
