import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private visibility = false;

  isModalOpen() {
    return this.visibility;
  }

  toggleModal() {
    this.visibility = !this.visibility;
  }
}
