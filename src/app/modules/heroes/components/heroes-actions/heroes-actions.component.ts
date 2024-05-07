import { Component, Input } from '@angular/core';
import { Hero } from '../../../../models/hero';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroes-actions',
  templateUrl: './heroes-actions.component.html',
  styleUrl: './heroes-actions.component.css'
})
export class HeroesActionsComponent {
  @Input() heroId: number | undefined;
  activateDeletePopUp = false;
  deleteMessage = '¿Estás seguro que deseas eliminar el héroe?'

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToHero(heroId: number | undefined) {
    this.router.navigate(['hero', heroId], {relativeTo: this.route})
  }

  handleDeleteAnswer(deletionConfirmed: boolean) {
    this.activateDeletePopUp = false;
    if (deletionConfirmed) {
      this.deleteHero(this.heroId);
    }
  }

  deleteHero(heroId: number | undefined) {
    console.log('about to delete')
  }
}
