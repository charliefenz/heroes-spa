import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroContainerComponent } from './hero-container.component';

describe('HeroContainerComponent', () => {
  let component: HeroContainerComponent;
  let fixture: ComponentFixture<HeroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
