import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean> = this.auth.user.pipe(
    map((user) => !!user)
  );

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = db.collection('users');
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
}
