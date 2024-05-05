//TODO unit tests not working. Fix

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

  describe('general Behavior', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display go-back button when loading', fakeAsync(() => {    
    }));

    it('should navigate back to "heroes" route when go-back button is clicked', fakeAsync(() => {    
      // // const navigateSpy = spyOn(router, 'navigate');
      // const button = fixture.debugElement.query(By.css('button#go-back-button'));
  
      // button.nativeElement.click();
      // console.log(harness.routeNativeElement?.ATTRIBUTE_NODE);
      // // tick(); 
      // // expect(navigateSpy).toHaveBeenCalledWith(['../heroes'], {relativeTo: route});
    }));
  })

  describe('Behavior when creating a hero', () =>{  
    it('should load the form with empty values', fakeAsync(() => {
    }));

    it('should enable all form inputs upon loading', fakeAsync(() => {
    }));

    it('should not display edit button', fakeAsync(() => {
    }));

    it('should disable save button and cancel button upon loading', fakeAsync(() => {
    }));

    it('should enable save button only when the form is valid', fakeAsync(() => {
    }));

    it('should enable cancel button when the form detects interaction', fakeAsync(() => {
    }));

    it('should clear all inputs when cancel button is clicked', fakeAsync(() => {
    }));

    it('should disable save button and cancel button when cancel button is clicked', fakeAsync(() => {
    }));
  })

  describe('Behavior when displaying a hero', () => {
    it('should load the form with the correspondant values of the Hero', fakeAsync(() => {
    }));

    it('should disable all form inputs upon loading', fakeAsync(() => {
    }));

    it('should display edit button upon loading', fakeAsync(() => {
    }));

    it('should not display save button and cancel button upon loading', fakeAsync(() => {
    }));

    it('should display save button and cancel button when the edit button is clicked', fakeAsync(() => {
    }));

    it('should enable all form inputs when the edit button is clicked', fakeAsync(() => {
    }));

    it('should display original values when cancel button is clicked', fakeAsync(() => {
    }));

    it('should disable all form inputs when cancel button is clicked', fakeAsync(() => {
    }));
    
    it('should not display save button and cancel button after cancel button is clicked', fakeAsync(() => {
    }));
  })

  describe('Behavior when saving', () => {
    it('should send the input values when save button is clicked', fakeAsync(() => {
    }));

    it('should provide with a confirmation notification if saving was a succces', fakeAsync(() => {
    }));

    it('should provide with a error notification if saving was not a succces', fakeAsync(() => {
    }));

    it('should remain in the view when saving was a success and the operation performed was an edit', fakeAsync(() => {
    }));

    it('should redirect to "heroes" route when saving was a success and the operation performed was the creation of a new hero', fakeAsync(() => {
    }));

    it('should display an error message next to each input if the format is empty or incorrect', fakeAsync(() => {
    }));
  })
});
