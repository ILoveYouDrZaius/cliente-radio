import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './login.routes';
import { ManualComponent } from './manual/manual.component';
import { SocialComponent } from './social/social.component';
import { FormsModule } from '@angular/forms';
import { NavbarLoginModule } from '../../shared_components/navbar-login/navbar-login.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NavbarLoginModule
  ],
  declarations: [
    ManualComponent,
    SocialComponent,
    LoginComponent
  ]
})
export class LoginModule { }
