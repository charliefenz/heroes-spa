import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesFilterContainerComponent } from './heroes-filter-container.component';

describe('HeroesFilterContainerComponent', () => {
  let component: HeroesFilterContainerComponent;
  let fixture: ComponentFixture<HeroesFilterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesFilterContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroesFilterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
