import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionablePopUpComponent } from './actionable-pop-up.component';

describe('ActionablePopUpComponent', () => {
  let component: ActionablePopUpComponent;
  let fixture: ComponentFixture<ActionablePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionablePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionablePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
