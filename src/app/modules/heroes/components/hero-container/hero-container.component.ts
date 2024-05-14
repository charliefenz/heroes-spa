import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, concatMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-hero-container',
  templateUrl: './hero-container.component.html',
  styleUrl: './hero-container.component.scss'
})
export class HeroContainerComponent implements OnInit, OnDestroy{
  loadingSpinner = true;
  hero: Hero | undefined;
  nameToShow = "";
  subscriptions: Subscription[] = []

  constructor(private route: ActivatedRoute, private heroesService: HeroesService) {
    
  }

  ngOnInit(): void {
    this.getHeroByParam();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub => {
      sub.unsubscribe();
    }))
  }

  getHeroByParam() {
    let paramsSub: Subscription;

    paramsSub = this.route.params.pipe(
      concatMap((param) => this.heroesService.getHero(Number(param['id'])))
    ).subscribe((response) => {
      this.loadingSpinner = false;
      if (response.code === 200) {
        this.hero = response.result as Hero
        this.nameToShow = this.hero.name;
      } else {
        // TODO Implement error message
      }
    })
    this.subscriptions.push(paramsSub)
  }

  handleNameFromForm(nameChanged: string) {
    this.nameToShow = nameChanged;
  }
}
