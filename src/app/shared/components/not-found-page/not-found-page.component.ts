import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmbeddedNotificationComponent } from '../embedded-notification/embedded-notification.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [EmbeddedNotificationComponent, MatButtonModule],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss'
})
export class NotFoundPageComponent {
  errorMessage = "¡Oops, no encontramos lo que buscabas!";

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/heroes'])
  }
}
