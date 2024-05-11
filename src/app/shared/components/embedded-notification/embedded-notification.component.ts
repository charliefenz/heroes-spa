import { NgClass } from '@angular/common';
import { Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NBAInput } from '../../../models/nbaInput';

@Component({
  selector: 'app-embedded-notification',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule],
  templateUrl: './embedded-notification.component.html',
  styleUrl: './embedded-notification.component.scss'
})
export class EmbeddedNotificationComponent {
  @Input() nbaType: NBAInput['nbaType'] = 'info';
  @Input() message: string | undefined;
  showTimeout = 5000;
  iconsName = {
    info: 'info',
    success: 'check_circle',
    error: 'warning'
  };
}