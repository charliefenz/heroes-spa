import { Component, Input } from '@angular/core';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-heroes-actions',
  templateUrl: './heroes-actions.component.html',
  styleUrl: './heroes-actions.component.css'
})
export class HeroesActionsComponent {
  @Input() hero: Hero | undefined;

}
