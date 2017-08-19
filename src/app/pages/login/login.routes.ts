import { Routes } from '@angular/router';
import { ManualComponent } from './manual/manual.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'manual' },
  { path: 'manual', component: ManualComponent, data: { title: 'Accede con tu usuario y contraseña' } }
];