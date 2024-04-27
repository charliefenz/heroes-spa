import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule)}
];
