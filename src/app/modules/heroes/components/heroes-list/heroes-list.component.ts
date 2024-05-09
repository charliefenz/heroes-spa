import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../../../models/hero';
import { concatMap, map } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent implements OnInit, OnChanges{
  @Input() filterKeyword: string | undefined;
  @Output() resetFilterDueToHeroDeletion: EventEmitter<boolean> = new EventEmitter();
  heroeCallReceived = false;
  errorCaptured = false;
  errorMessage = "";
  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.handleGetHeroes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterKeyword'].currentValue !== undefined && changes['filterKeyword'].currentValue !== changes['filterKeyword'].previousValue) {
      if (this.filterKeyword && this.filterKeyword !== "") {
        this.filterHeroes(this.filterKeyword);
      } else {
        this.heroeCallReceived = false;
        this.handleGetHeroes();
      }
    }
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

  filterHeroes(heroesKeyword: string) {
    this.heroeCallReceived = false;
    if (heroesKeyword) {
      this.heroesService.searchHeroes(heroesKeyword).subscribe((response) => {
        if (response.code === 200) {
          console.log(response.result as Hero[])
          this.heroes = response.result as Hero[]
        } else {
          //TODO develop error notification
        }
        this.heroeCallReceived = true;
      })
    }
  }

  deleteHero(heroId: number | undefined) {
    this.heroeCallReceived = false;
    this.resetFilterDueToHeroDeletion.emit(true);
    if (heroId) {
      this.heroesService.deletehero((heroId)).pipe(
        map(deleteResponse => {
          if (deleteResponse.code === 200) {
            console.log(deleteResponse.result)
          } else {
            //TODO develop error notification
          }
          this.resetFilterDueToHeroDeletion.emit(false);
        }),
        concatMap(() => this.heroesService.getHeroes())
      ).subscribe((getHeroesResponse) => {
        if (getHeroesResponse.code === 200) {
          console.log(getHeroesResponse.result)
          this.heroes = getHeroesResponse.result as Hero[];
          this.errorCaptured = false;
        } else {
          this.errorCaptured = true;
          this.errorMessage = getHeroesResponse.result as string;
        }
        this.heroeCallReceived = true;
      }) 
      
      
      this.heroesService.deletehero((heroId)).subscribe((response) => {
        if (response.code === 200) {
          console.log(response.result)
        } else {
          //TODO develop error notification
        }
        this.resetFilterDueToHeroDeletion.emit(false);
      }) 
    }
  }
}
