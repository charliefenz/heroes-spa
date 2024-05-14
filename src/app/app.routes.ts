import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';

export const routes: Routes = [
  {path: 'heroes', loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule)},
  {path: '', redirectTo: '/heroes', pathMatch: 'full'},
  { path: '**', component: NotFoundPageComponent }
];
