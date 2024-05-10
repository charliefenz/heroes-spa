import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaComponent } from './nba.component';

describe('NbaComponent', () => {
  let component: NbaComponent;
  let fixture: ComponentFixture<NbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display wrapper class and icon img depending on the Input passed in', () => {});
  it('should display the message passed in by Input', () => {});
});
