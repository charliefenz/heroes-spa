import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateTo(route: string) {
    this.router.navigate([route], {relativeTo: this.route})
  }
}
