import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroes-filter-container',
  templateUrl: './heroes-filter-container.component.html',
  styleUrl: './heroes-filter-container.component.css'
})
export class HeroesFilterContainerComponent {
  filterKeyword: string | undefined;
  resetFilterValue = false;

  constructor(private router: Router, private route: ActivatedRoute) { 
  }
  
  navigateTo(route: string) {
    this.router.navigate([`heroes/${route}`]);
  }

  informFilterToResetValue(resetValue: boolean) {
    this.resetFilterValue = resetValue;
  }

}
