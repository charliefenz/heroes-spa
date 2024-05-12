import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-actionable-pop-up',
  templateUrl: './actionable-pop-up.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ]
})
export class ActionablePopUpComponent {
  constructor(public dialogRef: MatDialogRef<ActionablePopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
}