import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';

@Component({
  selector: 'ng-clips-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit {
  id = '';
  player?: videojs.Player;

  @ViewChild('videoPlayer', { static: true })
  target?: ElementRef;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
}
