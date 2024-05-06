import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../../../models/hero';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent implements OnChanges{
  @Input() hero: Hero | undefined; 
  heroForm: FormGroup;
  addingNewSuperpower = false;
  editBehavior = false;
  superpowerAlreadyExists = false;
  activateSpinner = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private heroesService: HeroesService) {
    this.heroForm = this.formBuilder.group({
      heroImage: ['', Validators.required],
      heroName: ['', Validators.required],
      heroStatus: [true, Validators.required],
      heroAge: [null, [Validators.required, Validators.min(1)]],
      heroSuperpowerList: [[]],
      newSuperpower: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero'] && changes['hero'].currentValue) {
      this.editBehavior = false;
      if (this.hero) {
        this.supplyFormValuesWithHeroDetails();
        this.heroForm.disable();
      }
    }
  }

  supplyFormValuesWithHeroDetails(): void {
    this.heroForm.patchValue({
      heroImage: this.hero?.image,
      heroName: this.hero?.name,
      heroStatus: this.hero?.isActive,
      heroAge: this.hero?.age,
      heroSuperpowerList: this.hero?.superpowers,
    })
  }

  onSubmit() {
    let hero: Hero;

    if (this.heroForm.valid) {
      this.activateSpinner = true;
      hero = this.setHeroObject(this.editBehavior);
      if (this.editBehavior) {
        this.heroesService.editHero(hero).subscribe((response) => {
          if (response.code === 200) {
            this.activateSpinner = false;
            // TODO Insert success notification when developed
          } else {
            console.log(response);
            // TODO Insert error notification when developed
          }
        })
      } else {
        this.heroesService.createHero(hero).subscribe((response) => {
          if (response.code === 200) {
            this.activateSpinner = false;
            // TODO Insert success notification when developed
            this.navigateTo('../')
          } else {
            console.log(response);
            // TODO Insert error notification when developed
          }
        })
      }
    }
  }

  setHeroObject(editBehavior: boolean): Hero {
    let setId: number;
    
    setId = editBehavior && this.hero?.id ? this.hero.id : -1
    const HERO: Hero = {
      id: setId, // The service requires the full model despite is the one to assign the id,
      name: this.heroForm.get('heroName')?.value,
      age: this.heroForm.get('heroAge')?.value,
      isActive: this.heroForm.get('heroStatus')?.value,
      image: this.heroForm.get('heroImage')?.value,
      superpowers: this.heroForm.get('heroSuperpowerList')?.value,
    }
    return HERO
  }

  navigateTo(route: string) {
    this.router.navigate([route], {relativeTo: this.route})
  }

  // FEAT Extract to a component and add edit and cancel features
  toggleAddNewSuperpower() {
    this.addingNewSuperpower = !this.addingNewSuperpower;
    if (!this.addingNewSuperpower) {
      this.heroForm.get('newSuperpower')?.setValue('');
    }
  }

  cancelAddNewSuperpower() {
    this.toggleAddNewSuperpower();
  }

  addNewSuperpower() {
    let newSuperpower: string;
    
    newSuperpower = this.heroForm.get('newSuperpower')?.value;
    newSuperpower.trim();
    if (!this.heroForm.value.heroSuperpowerList.includes(newSuperpower)) {
      this.superpowerAlreadyExists = false;
      this.heroForm.value.heroSuperpowerList.push(newSuperpower);
      this.heroForm.get('newSuperpower')?.setValue('');
      this.toggleAddNewSuperpower();
    } else {
      this.superpowerAlreadyExists = true;
    }
  }

  cancel() {
    if (this.editBehavior && this.hero) {
      this.heroForm.disable();
      this.supplyFormValuesWithHeroDetails()
      this.editBehavior = false;
    } else {
      this.heroForm.reset();
    }
  }

  edit() {
    this.heroForm.enable();
    this.editBehavior = true;
  }
  
}
