import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesActionsComponent } from './heroes-actions.component';

describe('HeroesActionsComponent', () => {
  let component: HeroesActionsComponent;
  let fixture: ComponentFixture<HeroesActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "hero/heroId" route when clicking more-details button', () => {})
  it('should activate deletion pop up and provide a message for it when clicking delete button', () => {})
  it('should deactivate deletion pop up when clicking a yes or no option', () => {})
  it('should emit heroId to hero-item component when "yes" is selected in deletion pop up', () => {})
});
