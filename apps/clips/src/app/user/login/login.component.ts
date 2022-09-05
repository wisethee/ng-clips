import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'ng-clips-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMessage = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  async login() {
    this.showAlert = true;
    this.alertMessage = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMessage =
        'An unespected error occurred. Please try again later.';
      this.alertColor = 'red';

      console.log(error);

      return;
    }
    this.alertMessage = 'Success! You are now logged in.';
    this.alertColor = 'green';
  }
}
