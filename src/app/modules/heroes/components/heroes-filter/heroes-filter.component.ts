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
  TIMEOUT_AFTER_TYPING = 700;

  constructor() {
    let valueChangesSub : Subscription;
    
    valueChangesSub = this.filterControl.valueChanges.pipe(
      debounceTime(this.TIMEOUT_AFTER_TYPING), // Debounce to wait for user to finish typing
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
    this.subscriptions.push(valueChangesSub);
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
