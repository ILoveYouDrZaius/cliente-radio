import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthService ]
})
export class NavbarComponent implements OnInit {
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

  logout() {
    this.auth.logout();
  }

}
