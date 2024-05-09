import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() setFullViewSpinner = false;
  @Input() setSmallSizeSpinner = false;
  sizeControl = {
    'size-small': this.setSmallSizeSpinner,
    'size-medium': !this.setSmallSizeSpinner
  }
}
