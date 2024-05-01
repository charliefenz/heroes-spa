import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'heroes', loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule)},
  {path: '', redirectTo: '/heroes', pathMatch: 'full'},
];
