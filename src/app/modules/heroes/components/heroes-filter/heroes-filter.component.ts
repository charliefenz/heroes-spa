import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrl: './heroes-filter.component.scss'
})
export class HeroesFilterComponent implements OnChanges, OnDestroy{
  filterControl = new FormControl('');
  @Output() filterHeroes: EventEmitter<string> = new EventEmitter();
  @Input() cleanInputValue = false;
  subscriptions: Subscription[] = [];

  constructor() {   
    const VALUE_CHANGES_SUB = this.filterControl.valueChanges.pipe(
      debounceTime(300), // Debounce to wait for user to finish typing
      distinctUntilChanged(), // Ignore repeated values
    ).subscribe(value => {
      if (this.filterControl.dirty) {
        if (value === null || value.trim() === '') {
          this.filterHeroes.emit('');
        } else {
          this.filterHeroes.emit(value.trim());
        }
      }
    });
    this.subscriptions.push(VALUE_CHANGES_SUB);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub => {
      sub.unsubscribe();
    }))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cleanInputValue'] && changes['cleanInputValue'].currentValue === true) {
      this.filterControl.patchValue('');
    }
  }
}
