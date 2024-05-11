import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../../models/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-actions',
  templateUrl: './heroes-actions.component.html',
  styleUrl: './heroes-actions.component.scss'
})
export class HeroesActionsComponent {
  @Input() heroId: number | undefined;
  @Output() performDeletion: EventEmitter<number> = new EventEmitter();
  activateDeletePopUp = false;
  deleteMessage = '¿Estás seguro que deseas eliminar el héroe?'

  constructor(private router: Router, private route: ActivatedRoute, private heroesService: HeroesService) {}

  navigateToHero(heroId: number | undefined) {
    this.router.navigate(['heroes/hero', heroId])
  }

  handleDeleteAnswer(userWantsToDelete: boolean) {
    if (userWantsToDelete && this.heroId) this.performDeletion.emit(this.heroId);
    this.activateDeletePopUp = false;
  }
}
