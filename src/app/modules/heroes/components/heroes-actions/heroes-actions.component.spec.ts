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
});
