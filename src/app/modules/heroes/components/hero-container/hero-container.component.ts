import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-hero-container',
  templateUrl: './hero-container.component.html',
  styleUrl: './hero-container.component.css'
})
export class HeroContainerComponent implements OnInit{
  loadingSpinner = true;
  hero: Hero | undefined;

  constructor(private route: ActivatedRoute, private heroesService: HeroesService) {
    
  }

  ngOnInit(): void {
    this.getHeroByParam();
  }

  getHeroByParam() {
    this.route.params.pipe(
      concatMap((param) => this.heroesService.getHero(Number(param['id'])))
    ).subscribe((response) => {
      this.loadingSpinner = false;
      if (response.code === 200) {
        this.hero = response.result as Hero
      } else {
        // TODO Implement error message
      }
    })
  }
}
