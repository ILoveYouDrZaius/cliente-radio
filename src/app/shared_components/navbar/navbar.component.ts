import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthService, UsersService ]
})
export class NavbarComponent implements OnInit {
  private _loginStatus: boolean;
  private username: string;

  constructor(private auth: AuthService,
              private router: Router,
              private usersService: UsersService) { }

  ngOnInit() {
    this.auth.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.auth.isAuthenticated();
      if (this._loginStatus) {
        this.usersService.getUserName(this.auth.getCurrentUserId()).subscribe((username) => {
          this.username = username;
        });
        this.router.navigateByUrl('/');
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
