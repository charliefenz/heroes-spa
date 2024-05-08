import { Component, Input, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../../../models/hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent implements OnInit{
  @Input() filterKeyword: string | undefined;
  heroeCallReceived = false;
  errorCaptured = false;
  errorMessage = "";
  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.handleGetHeroes();
  }

  handleGetHeroes() {
    this.heroesService.getHeroes().subscribe((getHeroesResponse) => {
      this.heroeCallReceived = false;
      if (getHeroesResponse.code === 200) {
        this.heroes = getHeroesResponse.result as Hero[];
        this.errorCaptured = false;
      } else {
        this.errorCaptured = true;
        this.errorMessage = getHeroesResponse.result as string;
      }
      this.heroeCallReceived = true;
    })
  }
}
