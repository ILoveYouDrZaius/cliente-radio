import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { routes } from './signup.routes';
import { FormsModule } from '@angular/forms';
import { NavbarLoginModule } from '../../shared_components/navbar-login/navbar-login.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NavbarLoginModule
  ],
  declarations: [
    SignupComponent
  ]
})
export class SignupModule { }
