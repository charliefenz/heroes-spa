import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesActionsComponent } from './components/heroes-actions/heroes-actions.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroesFilterComponent } from './components/heroes-filter/heroes-filter.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroesItemComponent } from './components/heroes-item/heroes-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeroesActionsComponent,
    HeroesFilterComponent,
    HeroFormComponent,
    HeroesItemComponent,
    HeroesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HeroesListComponent}
    ])
  ]
})
export class HeroesModule { }
