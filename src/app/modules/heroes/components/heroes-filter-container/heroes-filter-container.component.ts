import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-filter-container',
  templateUrl: './heroes-filter-container.component.html',
  styleUrl: './heroes-filter-container.component.scss'
})
export class HeroesFilterContainerComponent {
  filterKeyword: string | undefined;
  resetFilterValue = false;

  constructor(private router: Router) {}
  
  navigateTo(route: string) {
    this.router.navigate([`heroes/${route}`]);
  }

  informFilterToResetValue(resetValue: boolean) {
    this.resetFilterValue = resetValue;
  }
}
