import { Injectable } from '@angular/core';

interface IModals {
  id: string;
  visibility: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modals: IModals[] = [];

  register(id: string) {
    this.modals.push({ id, visibility: false });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  isModalOpen(id: string) {
    return !!this.modals.find((modal) => modal.id === id)?.visibility;
  }

  toggleModal(id: string) {
    const modal = this.modals.find((modal) => modal.id === id);
    if (modal) {
      modal.visibility = !modal.visibility;
    }
  }
}
