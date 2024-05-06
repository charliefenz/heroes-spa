import { Component, Input } from '@angular/core';
import { Hero } from '../../../../models/hero';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroes-actions',
  templateUrl: './heroes-actions.component.html',
  styleUrl: './heroes-actions.component.css'
})
export class HeroesActionsComponent {
  @Input() hero: Hero | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToHero(heroId: number | undefined) {
    this.router.navigate(['hero', heroId], {relativeTo: this.route})
  }
}
