import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ng-clips-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.register('auth');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('auth');
  }
}
