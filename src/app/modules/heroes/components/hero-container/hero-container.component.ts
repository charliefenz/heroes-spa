import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  errorFetchingHero = false;
  errorMessage = "";

  constructor(private router: Router, private route: ActivatedRoute, private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.getHeroByParam();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub => {
      sub.unsubscribe();
    }))
  }

  getHeroByParam() {
    const PARAMS_SUB = this.route.params.pipe(
      concatMap((param) => this.heroesService.getHero(Number(param['id'])))
    ).subscribe((response) => {
      this.loadingSpinner = false;
      if (response.code === 200) {
        this.hero = response.result as Hero
        this.nameToShow = this.hero.name;
      } else {
        this.errorFetchingHero = true;
        this.errorMessage = response.result as string;
      }
    })
    this.subscriptions.push(PARAMS_SUB)
  }

  handleNameFromForm(nameChanged: string) {
    this.nameToShow = nameChanged;
  }

  navigateBack() {
    this.router.navigate(['/heroes'])
  }
}
