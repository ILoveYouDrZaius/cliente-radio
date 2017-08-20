import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  private _email: string;
  private _password: string;
  private _repassword: string;
  private _key: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signup() {
    this.authService.signupWithEmail(this.email, this.password, this.repassword);
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
}