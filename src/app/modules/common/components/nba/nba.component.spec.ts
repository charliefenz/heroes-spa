import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NBAComponent } from './nba.component';

describe('NBAComponent', () => {
  let component: NBAComponent;
  let fixture: ComponentFixture<NBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NBAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
