import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ AuthService ]
})
export class SignupComponent implements OnInit {

  private _username: string;
  private _email: string;
  private _password: string;
  private _repassword: string;
  private _key: string;
  private _loginStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.authService.isAuthenticated();
      if (this._loginStatus) {
        this.router.navigateByUrl('/');
      }
    });
  }

  signup() {
    console.log('SIGNUP: ', this._username);
    this.authService.signupWithEmail(this.email, this.password, this.repassword, this.username);
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get repassword(): string {
    return this._repassword;
  }

  set repassword(value: string) {
    this._repassword = value;
  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
