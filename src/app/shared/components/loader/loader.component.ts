import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgClass, MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() setFullViewSpinner = false;
  @Input() setSmallSizeSpinner = false;
  smallSizeValueInPx = 50;
  mediumSizeValueInPx = 150;

  chooseSize(): number {
    return this.setSmallSizeSpinner ? this.smallSizeValueInPx : this.mediumSizeValueInPx
  }
}
