import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-clips-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input()
  tabTitle = '';

  @Input()
  active = false;
}
