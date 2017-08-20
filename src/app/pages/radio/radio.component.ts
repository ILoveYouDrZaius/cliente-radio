import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [ AuthService ]
})
export class RadioComponent implements OnInit {
  private _loginStatus: boolean;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.auth.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.auth.isAuthenticated();
      if (this._loginStatus) {
        this.router.navigateByUrl('/');
      }
    });
  }

}
