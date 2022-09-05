import { Component } from '@angular/core';

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

  login() {
    console.log(this.credentials);
  }
}