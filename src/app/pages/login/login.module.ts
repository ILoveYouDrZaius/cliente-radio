import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './login.routes';
import { ManualComponent } from './manual/manual.component';
import { SocialComponent } from './social/social.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManualComponent,
    SocialComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class LoginModule { }