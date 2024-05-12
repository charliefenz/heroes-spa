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
import { MockApiService } from '../../mock-API/mock-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NbaComponent } from '../../shared/components/nba/nba.component';
import { EmbeddedNotificationComponent } from '../../shared/components/embedded-notification/embedded-notification.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    HeroContainerComponent,
    HeroFormComponent,
    HeroesActionsComponent,
    HeroesFilterComponent,
    HeroesFilterContainerComponent,
    HeroesItemComponent,
    HeroesListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HeroesFilterContainerComponent},
      {path: 'new-hero', component: HeroFormComponent},
      {path: 'hero/:id', component: HeroContainerComponent}
    ]),
    ReactiveFormsModule,
    LoaderComponent,
    NbaComponent,
    EmbeddedNotificationComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    MockApiService
  ]
})
export class HeroesModule { }
