import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputDialogComponent } from './image-input-dialog.component';

describe('ImageInputDialogComponent', () => {
  let component: ImageInputDialogComponent;
  let fixture: ComponentFixture<ImageInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageInputDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
