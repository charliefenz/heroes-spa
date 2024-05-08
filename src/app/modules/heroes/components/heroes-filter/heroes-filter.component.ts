import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrl: './heroes-filter.component.css'
})
export class HeroesFilterComponent {
  filterControl = new FormControl('');
  @Output() filterHeroes: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.filterControl.valueChanges.pipe(
      debounceTime(300), // Debounce to wait for user to finish typing
      distinctUntilChanged(), // Ignore repeated values
    ).subscribe(value => {
      if (value === null || value.trim() === '') {
        this.filterHeroes.emit('');
      } else {
        this.filterHeroes.emit(value.trim());
      }
    });
  }
}
