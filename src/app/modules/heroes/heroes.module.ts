import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesActionsComponent } from './components/heroes-actions/heroes-actions.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroesFilterComponent } from './components/heroes-filter/heroes-filter.component';
import { HeroesFormComponent } from './components/heroes-form/heroes-form.component';
import { HeroesItemComponent } from './components/heroes-item/heroes-item.component';



@NgModule({
  declarations: [
    HeroesActionsComponent,
    HeroesFilterComponent,
    HeroesFormComponent,
    HeroesItemComponent,
    HeroesListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeroesModule { }
