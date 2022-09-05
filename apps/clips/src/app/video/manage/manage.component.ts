import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ng-clips-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === 2 ? params['sort'] : 1;
    });
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;

    this.router.navigateByUrl(`/manage?sort=${value}`);
  }
}
