import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLoginComponent } from './navbar-login.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NavbarLoginComponent
  ],
  exports: [ NavbarLoginComponent ]
})
export class NavbarLoginModule { }
