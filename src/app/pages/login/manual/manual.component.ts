import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css'],
  providers: [AuthService]
})
export class ManualComponent implements OnInit {

  private _email: string;
  private _password: string;
  private _title: string;
  private _loginStatus: boolean;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route
      .queryParamMap.subscribe(params => {
        this.title = params.get('title') || 'Accede con tu email y contraseña' // TODO: no lo recoge del parámetro
      });

    this.auth.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.auth.isAuthenticated();
      if (this._loginStatus) {
        this.router.navigateByUrl('/');
      }
    });

    this.email = '';
    this.password = '';
  }

  login() {
    this.auth.loginWithEmail(this.email, this.password);
    this.auth.getCurrentAuthState().subscribe(data => {
      this.auth.isAuthenticated();
      if (!this.auth.isAuthenticated()) {
        this.router.navigateByUrl('songs');
      }
    });
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

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}