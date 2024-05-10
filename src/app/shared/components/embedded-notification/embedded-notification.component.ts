import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-embedded-notification',
  standalone: true,
  imports: [NgClass],
  templateUrl: './embedded-notification.component.html',
  styleUrl: './embedded-notification.component.css'
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

