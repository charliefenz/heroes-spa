import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-filter-container',
  templateUrl: './heroes-filter-container.component.html',
  styleUrl: './heroes-filter-container.component.scss'
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
      let creationId = params['id'];
      if (creationId) {
        this.showCreationNba = true;
        if (creationId === 'error') {
          this.creationNbaType = 'error';
          this.creationMessage = `No se ha podido crear el héroe`
        } else {
          this.creationMessage = `Se ha creado el héroe con id ${params['id']}`
        }
        this.removeQueryParams();
      }
    })
  }

  removeQueryParams() {
    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve', // or 'preserve',
      replaceUrl: true
    };
    console.log('called')
    this.router.navigate(['heroes'], navigationExtras);
  }

  destroyCreationNba(destroyNba: boolean) {
    this.showCreationNba = !destroyNba;
  }

}
