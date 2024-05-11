import { NgClass } from '@angular/common';
import { Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-embedded-notification',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule],
  templateUrl: './embedded-notification.component.html',
  styleUrl: './embedded-notification.component.scss'
})
export class EmbeddedNotificationComponent {
  @Input() nbaType: 'error' | 'success' | 'info' = 'info';
  @Input() message: string | undefined;
  showTimeout = 5000;

  iconType: { [key: string]: string } = {
    error: 'errorRef', // TODO Look for icons
    success: 'successRef',
    info: 'infoRef'
  };
}

