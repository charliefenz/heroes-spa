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
  heroes: Hero[] = [];
  showNoHeroesNotification = false;
  NoHeroesNotificationType: 'error' | 'success' | 'info' = 'info';
  noHeroesMessage = "No se han encontrado Héroes";
  showDeletionNba = false;
  deletionNbaType: 'error' | 'success' | 'info' = 'success';
  deletionMessage = "";

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
      if (this.heroes.length === 0) {
        this.showNoHeroesNotification = true;
        this.NoHeroesNotificationType = 'info'  
      } else {
        this.showNoHeroesNotification = false ;  
      }
    } else {
      this.showNoHeroesNotification = true;
      this.noHeroesMessage = response.result as string;
      this.NoHeroesNotificationType = 'error'
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
          this.showDeletionNba = true;
          this.deletionMessage = deleteResponse.result as string;
          if (deleteResponse.code !== 200) {
            this.deletionNbaType = 'error';
            this.resetFilterDueToHeroDeletion.emit(false);
          }
        }),
        concatMap(() => this.heroesService.getHeroes())
      ).subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
    }
  }

  destroyDeletionNba(destroyNba: boolean) {
    this.showDeletionNba = !destroyNba;
  }
}
