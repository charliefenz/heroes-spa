import { Component, Input } from '@angular/core';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-heroes-item',
  templateUrl: './heroes-item.component.html',
  styleUrl: './heroes-item.component.css'
})
export class HeroesItemComponent {
  @Input() hero: Hero | undefined;

}
