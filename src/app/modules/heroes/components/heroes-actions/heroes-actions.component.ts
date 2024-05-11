import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActionablePopUpComponent } from '../../../../shared/components/actionable-pop-up/actionable-pop-up.component';

@Component({
  selector: 'app-heroes-actions',
  templateUrl: './heroes-actions.component.html',
  styleUrl: './heroes-actions.component.scss'
})
export class HeroesActionsComponent {
  @Input() heroId: number | undefined;
  @Output() performDeletion: EventEmitter<number> = new EventEmitter();
  deleteMessage = '¿Estás seguro que deseas eliminar el héroe?';

  constructor(private router: Router, public dialog: MatDialog) {}

  navigateToHero(heroId: number | undefined) {
    this.router.navigate(['heroes/hero', heroId])
  }

  openDeletePopUp() {
    const dialogRef = this.dialog.open(ActionablePopUpComponent, {data: {message: this.deleteMessage}});

    dialogRef.afterClosed().subscribe(userWantsToDelete => {
      if (userWantsToDelete && this.heroId) this.performDeletion.emit(this.heroId);
    });
  }
}
