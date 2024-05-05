import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroesFilterContainerComponent } from '../heroes-filter-container/heroes-filter-container.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing'
import { HeroesFilterComponent } from '../heroes-filter/heroes-filter.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { HeroesListComponent } from '../heroes-list/heroes-list.component';
import { By } from '@angular/platform-browser';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let router: Router;
  let harness: RouterTestingHarness
  let heroesSpy: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeroFormComponent,
        HeroesFilterContainerComponent,
        HeroesFilterComponent,
        HeroesListComponent
      ],
      providers: [provideRouter([{path: 'heroes', component: HeroesFilterContainerComponent}])]
    })
    .compileComponents();
    harness = await RouterTestingHarness.create();
    heroesSpy = await harness.navigateByUrl('heroes', HeroesFilterContainerComponent)
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    harness.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to "heroes" route when button assigned to go back is clicked', fakeAsync(() => {
    
    // const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('button#go-back-button'));

    button.nativeElement.click();
    console.log(harness.routeNativeElement?.ATTRIBUTE_NODE);
    // tick(); 
    // expect(navigateSpy).toHaveBeenCalledWith(['../heroes'], {relativeTo: route});
  }));
});
