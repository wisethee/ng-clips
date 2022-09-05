import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean> = this.auth.user.pipe(
    map((user) => !!user),
    delay(1000)
  );
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
      });
  }

  public async createUser(userData: IUser) {
    const { email, password, name, age, phoneNumber } = userData;

    if (!password) {
      throw new Error('Password not provided!');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      email as string,
      password as string
    );
    if (!userCred.user) {
      throw new Error("User can't be found");
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name,
      email,
      age,
      phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: name,
    });
  }

  async logout() {
    await this.auth.signOut();

    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
