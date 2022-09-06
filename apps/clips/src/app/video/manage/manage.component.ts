import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import IClip from '../../models/clip.model';
import { ClipService } from '../../services/clip.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ng-clips-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  clips: IClip[] = [];
  activeClip: IClip | null = null;

  sort$: BehaviorSubject<string> = new BehaviorSubject(this.videoOrder);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clipService: ClipService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
      this.sort$.next(this.videoOrder);
    });

    this.clipService.getUserClips(this.sort$).subscribe((docs) => {
      this.clips = [];
      docs.forEach((doc) => this.clips.push({ docId: doc.id, ...doc.data() }));
    });
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sort: value,
      },
    });
  }

  openModal(event: Event, clip: IClip) {
    event.preventDefault();

    this.activeClip = clip;
    this.modalService.toggleModal('editClip');
  }

  update(event: IClip) {
    this.clips.forEach((element, index) => {
      if (element.docId === event.docId) {
        this.clips[index].title = event.title;
      }
    });
  }

  deleteClip(event: Event, clip: IClip) {
    event.preventDefault();
    this.clipService.deleteClip(clip);

    this.clips.forEach((element, index) => {
      if (element.docId === clip.docId) {
        this.clips.splice(index, 1);
      }
    });
  }
}
