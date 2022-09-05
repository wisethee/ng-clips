import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
    public authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  openModal() {
    this.modalService.toggleModal('auth');

    return false;
  }

  async logout() {
    await this.afAuth.signOut();
    return false;
  }
}
