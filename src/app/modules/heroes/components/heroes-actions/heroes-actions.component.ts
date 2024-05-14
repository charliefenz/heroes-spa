import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActionablePopUpComponent } from '../../../../shared/components/actionable-pop-up/actionable-pop-up.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes-actions',
  templateUrl: './heroes-actions.component.html',
  styleUrl: './heroes-actions.component.scss'
})
export class HeroesActionsComponent implements OnDestroy {
  @Input() heroId: number | undefined;
  @Output() performDeletion: EventEmitter<number> = new EventEmitter();
  deleteMessage = '¿Estás seguro que deseas eliminar el héroe?';
  subscriptions: Subscription[] = [];

  constructor(private router: Router, public dialog: MatDialog) {}
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub => {
      console.log('called')
      sub.unsubscribe();
    }))
  }

  navigateToHero(heroId: number | undefined) {
    this.router.navigate(['heroes/hero', heroId])
  }

  openDeletePopUp() {
    let dialogRefSub : Subscription;
    const DIALOG_REF = this.dialog.open(ActionablePopUpComponent, {data: {message: this.deleteMessage}});

    dialogRefSub = DIALOG_REF.afterClosed().subscribe(userWantsToDelete => {
      if (userWantsToDelete && this.heroId) this.performDeletion.emit(this.heroId);
    });
    this.subscriptions.push(dialogRefSub);
  }
}
