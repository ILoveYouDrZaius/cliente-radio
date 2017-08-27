import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  providers: [AuthService]
})
export class SocialComponent implements OnInit {

  private _title: string;

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParamMap.subscribe(params => {
      this.title = params.get('title') || 'Accede con tu red social favorita' // TODO: no lo recoge del parámetro
    });
  }

  loginWithFacebook() {
    event.preventDefault();
    this.auth.loginWithFacebook();
    console.log('Login with Facebook');
  }

  loginWithGooglePlus() {
    event.preventDefault();
    this.auth.loginWithGooglePlus();
    console.log('Login with Google+');
  }

  loginWithTwitter() {
    event.preventDefault();
    this.auth.loginWithTwitter();
    console.log('Login with Twitter');
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}