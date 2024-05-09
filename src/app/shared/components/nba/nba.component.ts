import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-nba',
  standalone: true,
  imports: [],
  templateUrl: './nba.component.html',
  styleUrl: './nba.component.css'
})
export class NbaComponent {
  @Input() nbaType: 'error' | 'success' | 'info' = 'info';

  iconType: { [key: string]: string } = {
    error: 'errorRef', // TODO Look for icons
    success: 'successRef',
    info: 'infoRef'
  };
}

