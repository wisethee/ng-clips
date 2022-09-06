import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, of, switchMap, combineLatest } from 'rxjs';
import IClip from '../models/clip.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClipService implements Resolve<IClip | null> {
  clipsCollection: AngularFirestoreCollection<IClip>;
  pageClips: IClip[] = [];
  pendingRequests = false;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.clipsCollection = db.collection('clips');
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(data);
  }

  getUserClips(sort: BehaviorSubject<string>) {
    return combineLatest([this.auth.user, sort]).pipe(
      switchMap((values) => {
        const [user, sort] = values;

        if (!user) {
          return of([]);
        }

        const query = this.clipsCollection.ref
          .where('uid', '==', user.uid)
          .orderBy('timestamp', sort === '1' ? 'desc' : 'asc');

        return query.get();
      }),

      map((snapshot) => (snapshot as QuerySnapshot<IClip>).docs)
    );
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({ title });
  }

  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.clipFileName}`);
    const screenshotRef = this.storage.ref(
      `screenshots/${clip.screenshotFileName}`
    );

    const docRef = this.clipsCollection.doc(clip.docId);

    await clipRef.delete();
    await screenshotRef.delete();
    await docRef.delete();
  }

  async getClips() {
    if (this.pendingRequests) {
      return;
    }

    this.pendingRequests = true;

    let query = this.clipsCollection.ref.orderBy('timestamp', 'desc').limit(6);
    const { length } = this.pageClips;

    if (length) {
      const lastDocId = this.pageClips[length - 1].docId;
      const lastDoc = await this.clipsCollection
        .doc(lastDocId)
        .get()
        .toPromise();

      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    snapshot.forEach((document) => {
      this.pageClips.push({
        docId: document.id,
        ...document.data(),
      });
    });

    this.pendingRequests = false;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.clipsCollection
      .doc(route.params['id'])
      .get()
      .pipe(
        map((snapshot) => {
          const data = snapshot.data();
          if (!data) {
            this.router.navigate(['/']);
            return null;
          }

          return data;
        })
      );
  }
}
