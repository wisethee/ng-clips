import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ng-clips-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipComponent implements OnInit {
  id = '';
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
}
