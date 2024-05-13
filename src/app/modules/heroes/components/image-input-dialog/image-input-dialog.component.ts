import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-input-dialog',
  templateUrl: './image-input-dialog.component.html',
  styleUrl: './image-input-dialog.component.scss'
})
export class ImageInputDialogComponent {
  imageInput = new FormControl('');
  
  constructor(public dialogRef: MatDialogRef<ImageInputDialogComponent>) {}
}
