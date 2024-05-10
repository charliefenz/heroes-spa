import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedNotificationComponent } from './embedded-notification.component';

describe('EmbeddedNotificationComponent', () => {
  let component: EmbeddedNotificationComponent;
  let fixture: ComponentFixture<EmbeddedNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbeddedNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmbeddedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
