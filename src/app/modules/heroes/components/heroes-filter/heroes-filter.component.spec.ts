import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesFilterComponent } from './heroes-filter.component';

describe('HeroesFilterComponent', () => {
  let component: HeroesFilterComponent;
  let fixture: ComponentFixture<HeroesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the value inserted in the input', () => {})
  it('should not emit the value upon loading', () => {})
  it('should emit an empty value when the value inserted in the input has been deleted', () => {})
  it('should not emit the value right after a character has been inserted', () => {})
  it('should not emit the value if the last inserted character is the same as the previous one inserted', () => {})
  it('should clean inputs when ordered by parent component', () => {})
});
