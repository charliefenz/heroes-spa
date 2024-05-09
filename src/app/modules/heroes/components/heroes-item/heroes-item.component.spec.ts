import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesItemComponent } from './heroes-item.component';

describe('HeroesItemComponent', () => {
  let component: HeroesItemComponent;
  let fixture: ComponentFixture<HeroesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero-img and hero-name provided by heroes-list', () => {})
  it('should propagate hero-id value to heroes-list when received from heroes-actions', () => {})
});
