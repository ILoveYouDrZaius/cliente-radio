import { Routes } from '@angular/router';
import { ManualComponent } from './manual/manual.component';
import { SocialComponent } from './social/social.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }
  // { path: '', pathMatch: 'full', redirectTo: 'manual' },
  // //{ path: '', redirectTo: 'social'},
  // { path: 'social', component: SocialComponent, data: { title: 'Accede mediante tu red social favorita' } },
  // { path: 'manual', component: ManualComponent, data: { title: 'Accede con tu usario y contraseña' } }
];

