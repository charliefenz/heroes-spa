import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../../../models/hero';
import { concatMap, map } from 'rxjs';
import { Response } from '../../../../models/response';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent implements OnInit, OnChanges{
  @Input() filterKeyword: string | undefined;
  @Output() resetFilterDueToHeroDeletion: EventEmitter<boolean> = new EventEmitter();
  showLoadingSpinner = false;
  errorCaptured = false;
  errorMessage = "";
  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterKeyword'].currentValue !== undefined && changes['filterKeyword'].currentValue !== changes['filterKeyword'].previousValue) {
      if (this.filterKeyword && this.filterKeyword !== "") {
        this.filterHeroes(this.filterKeyword);
      } else {
        this.showLoadingSpinner = false;
        this.heroesService.getHeroes().subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
      }
    }
  }

  handleHeroesResponse(response: Response) {
    if (response.code === 200) {
      this.heroes = response.result as Hero[];
      this.errorCaptured = false;
    } else {
      this.errorCaptured = true;
      this.errorMessage = response.result as string;
    }
    this.showLoadingSpinner = true;
  }

  filterHeroes(heroesKeyword: string) {
    this.showLoadingSpinner = false;
    if (heroesKeyword) {
      this.heroesService.searchHeroes(heroesKeyword).subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
    }
  }

  deleteHero(heroId: number | undefined) {
    this.showLoadingSpinner = false;
    this.resetFilterDueToHeroDeletion.emit(true);
    if (heroId) {
      this.heroesService.deletehero((heroId)).pipe(
        map(deleteResponse => {
          if (deleteResponse.code !== 200) {
            //TODO develop error notification
          }
          this.resetFilterDueToHeroDeletion.emit(false);
        }),
        concatMap(() => this.heroesService.getHeroes())
      ).subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
    }
  }
}
