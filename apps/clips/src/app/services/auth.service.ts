import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = db.collection('users');
  }

  public async createUser(userData: IUser) {
    const { email, password, name, age, phoneNumber } = userData;

    if (!password) {
      throw new Error('Password not provided!');
    }

    await this.auth.createUserWithEmailAndPassword(
      email as string,
      password as string
    );
    await this.usersCollection.add({
      name,
      email,
      age,
      phoneNumber,
    });
  }
}
