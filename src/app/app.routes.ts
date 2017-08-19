import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: './pages/radio/radio.module#RadioModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupModule' },
//   { path: 'signup', loadChildren: './pages/signup/signup.module#SignupModule' },
  // { path: '**', component: NotFoundComponent },
];
