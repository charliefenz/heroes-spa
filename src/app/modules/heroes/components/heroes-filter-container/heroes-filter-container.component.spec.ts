import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroesFilterContainerComponent } from './heroes-filter-container.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeroesFilterComponent } from '../heroes-filter/heroes-filter.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { HeroesListComponent } from '../heroes-list/heroes-list.component';
import { By } from '@angular/platform-browser';

describe('HeroesFilterContainerComponent', () => {
  let component: HeroesFilterContainerComponent;
  let fixture: ComponentFixture<HeroesFilterContainerComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeroFormComponent,
        HeroesFilterComponent,
        HeroesFilterContainerComponent,
        HeroesListComponent
      ],
      imports: [CommonModule, RouterModule.forRoot([])]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesFilterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "new-hero" route when button assigned to create a hero is clicked', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('button#create-hero-button'));

    button.nativeElement.click(); 
    tick(); 
    expect(navigateSpy).toHaveBeenCalledWith(['new-hero'], {relativeTo: route});
  }));

  it('should resend the filter keyword to heroes-list when received by heroes-filter', () => {})

  // Add more tests as needed
});
