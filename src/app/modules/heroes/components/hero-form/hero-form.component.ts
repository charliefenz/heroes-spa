import { Component, Input, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../../../models/hero';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {
  @Input() hero: Hero | undefined; 
  heroForm: FormGroup;
  addingNewSuperpower = false;
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

  onSubmit() {
    let hero: Hero;

    if (this.heroForm.valid) {
      this.activateSpinner = true;
      hero = this.setHeroObject();
      this.heroesService.createHero(hero).subscribe((response) => {
        if (response.code === 200) {
          this.activateSpinner = false;
          // TODO Insert success notification when developed
          this.navigateTo('../')
        } else {
          console.log(response);
          // TODO Insert error notification when developed
        }
      });
    }
  }

  setHeroObject(): Hero {
    const HERO: Hero = {
      id: -1, // The service requires the full model despite is the one to assign the id,
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

  cleanInputs() {
    this.heroForm.reset();
  }
  
}
