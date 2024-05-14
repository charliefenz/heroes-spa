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

  it('should display a list of heroes upon loading', () => {});

  it('should display an error message if no heroes can be obtained', () => {});

  it('should pass down a hero to heroes-tem', () => {});

  it('should delete a hero when receiving an emitted value from hero-item', () => {});
  
  it('should emit an order for reseting the filter input due to a hero deletion', () => {})
  
  it('should display a loader while waiting for the responses done to the heroes service', () => {})

  it('should filter heroes list when the input variable has a not-null new value', () => {})

  it('should display full heroes list when the input variable has a null new value', () => {})
  
  it('should destroy any nba when signal from nba comp is received', () => {})

  it('should display a success nba when deleting hero is executed and is successful', () => {})

  it('should display an error nba when deleting hero is executed and is faulty', () => {})

  it('should display an info embedded notification whenever heroes list doesn\t have any items', () => {})

  it('should display an error embedded notification whenever heroes list operations is faulty', () => {})
});
