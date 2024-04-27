import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroContainerComponent } from './components/hero-container/hero-container.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroesActionsComponent } from './components/heroes-actions/heroes-actions.component';
import { HeroesFilterComponent } from './components/heroes-filter/heroes-filter.component';
import { HeroesFilterContainerComponent } from './components/heroes-filter-container/heroes-filter-container.component';
import { HeroesItemComponent } from './components/heroes-item/heroes-item.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeroContainerComponent,
    HeroFormComponent,
    HeroesActionsComponent,
    HeroesFilterComponent,
    HeroesFilterContainerComponent,
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
