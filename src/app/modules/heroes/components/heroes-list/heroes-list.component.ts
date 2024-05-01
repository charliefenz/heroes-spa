import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { Response } from '../../../../models/response';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css'
})
export class HeroesListComponent implements OnInit{  
  heroes$!: Observable<Response>;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroes$ = this.heroesService.getHeroes();
  }
  }
}
