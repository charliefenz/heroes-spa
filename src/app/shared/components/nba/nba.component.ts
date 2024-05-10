import { NgClass } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-nba',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nba.component.html',
  styleUrl: './nba.component.css'
})
export class NbaComponent {
  @Input() nbaType: 'error' | 'success' | 'info' = 'info';
  @Input() message = "LOREM IPSUM DOLOR";

  iconType: { [key: string]: string } = {
    error: 'errorRef', // TODO Look for icons
    success: 'successRef',
    info: 'infoRef'
  };
}

