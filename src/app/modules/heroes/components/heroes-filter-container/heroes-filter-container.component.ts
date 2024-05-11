import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-filter-container',
  templateUrl: './heroes-filter-container.component.html',
  styleUrl: './heroes-filter-container.component.css'
})
export class HeroesFilterContainerComponent {
  filterKeyword: string | undefined;
  resetFilterValue = false;
  showCreationNba = false;
  creationNbaType : 'success' | 'error' | 'info' = 'success';
  creationMessage = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.informCreationOfHero(this.route.params);
  }
  
  navigateTo(route: string) {
    this.router.navigate([`heroes/${route}`]);
  }

  informFilterToResetValue(resetValue: boolean) {
    this.resetFilterValue = resetValue;
  }

  informCreationOfHero(params$: Observable<Params>) {
    params$.subscribe((params) => {
      if (params['id']) {
        this.showCreationNba = true;
        this.creationMessage = `Se ha creado el héroe con id ${params['id']}`
      }
    })
  }

  destroyCreationNba(destroyNba: boolean) {
    this.showCreationNba = !destroyNba;
  }

}
