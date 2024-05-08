import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of heroes on loading', () => {});

  it('should show an spinner when waiting for heroes service responses', () => {});

  it('should display an error message if no heroes can be obtained', () => {});

  it('should delete a hero when receiving an emitted value from hero-item', () => {});

});
