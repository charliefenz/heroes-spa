import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../../../models/hero';
import { Subscription, concatMap, map } from 'rxjs';
import { Response } from '../../../../models/response';
import { NBAInput } from '../../../../models/nbaInput';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NbaComponent } from '../../../../shared/components/nba/nba.component';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent implements OnInit, OnChanges{
  @Input() filterKeyword: string | undefined;
  @Output() resetFilterDueToHeroDeletion: EventEmitter<boolean> = new EventEmitter();
  showLoadingSpinner = false;
  heroes: Hero[] = [];
  showNoHeroesNotification = false;
  snackBarDisplayInfo = {
    nbaType: 'success',
    message: ''
  };
  NoHeroesNotificationType: NBAInput['nbaType'] = 'info';
  noHeroesMessage = "No se han encontrado Héroes";
  subscriptions: Subscription[] = [];

  constructor(private heroesService: HeroesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let getHeroesSub: Subscription;

    getHeroesSub = this.heroesService.getHeroes().subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
    this.subscriptions.push(getHeroesSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub => {
      sub.unsubscribe();
    }))
  }

  ngOnChanges(changes: SimpleChanges): void {
    let getHeroesSub: Subscription;

    if (changes['filterKeyword'].currentValue !== undefined && changes['filterKeyword'].currentValue !== changes['filterKeyword'].previousValue) {
      if (this.filterKeyword && this.filterKeyword !== "") {
        this.filterHeroes(this.filterKeyword);
      } else {
        this.showLoadingSpinner = false;
        getHeroesSub = this.heroesService.getHeroes().subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
        this.subscriptions.push(getHeroesSub);
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
    let searchHeroesSub: Subscription;

    this.showLoadingSpinner = false;
    if (heroesKeyword) {
      searchHeroesSub =  this.heroesService.searchHeroes(heroesKeyword).subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
      this.subscriptions.push(searchHeroesSub);
    }
  }

  deleteHero(heroId: number | undefined) {
    let deleteHeroSub : Subscription;

    this.showLoadingSpinner = false;
    this.resetFilterDueToHeroDeletion.emit(true);
    if (heroId) {
      deleteHeroSub = this.heroesService.deletehero((heroId)).pipe(
        map(deleteResponse => {
          this.snackBarDisplayInfo.message = deleteResponse.result as string;
          if (deleteResponse.code !== 200) {
            this.snackBarDisplayInfo.nbaType = 'error';
            this.resetFilterDueToHeroDeletion.emit(false);
          }
          this.snackBar.openFromComponent(NbaComponent, {data: this.snackBarDisplayInfo})
        }),
        concatMap(() => this.heroesService.getHeroes())
      ).subscribe((heroesResponse) => this.handleHeroesResponse(heroesResponse));
      this.subscriptions.push(deleteHeroSub);
    }
  }
}
