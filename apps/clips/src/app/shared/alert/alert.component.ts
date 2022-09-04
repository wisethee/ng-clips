import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-clips-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input()
  color = 'blue';

  get bgColor() {
    return `bg-${this.color}-400`;
  }
}
