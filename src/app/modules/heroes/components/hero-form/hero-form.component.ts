import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../../../models/hero';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NbaComponent } from '../../../../shared/components/nba/nba.component';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnChanges{
  @Input() hero: Hero | undefined;
  @Output() nameEmitter: EventEmitter<string> = new EventEmitter();
  heroForm: FormGroup;
  addingNewSuperpower = false;
  editBehavior = false;
  superpowerAlreadyExists = false;
  activateSpinner = false;
  createdHeroSuccessBaseMessage = 'Se ha creado el héroe con el id';
  snackBarDisplayInfo = {
    nbaType: 'success',
    message: ''
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private heroesService: HeroesService, private snackBar: MatSnackBar) {
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
          this.activateSpinner = false;
          if (response.code === 200) {
            this.emitName(hero.name);
            this.heroForm.disable();
            this.editBehavior = false;
            this.snackBarDisplayInfo.nbaType = 'success';
          } else {
            this.snackBarDisplayInfo.nbaType = 'error';
            this.cancel();
          }
          this.snackBarDisplayInfo.message = response.result as string;
          this.snackBar.openFromComponent(NbaComponent, {data: this.snackBarDisplayInfo})
        })
      } else {
        this.heroesService.createHero(hero).subscribe((response) => {
          this.activateSpinner = false;
          if (response.code === 200) {
            this.snackBarDisplayInfo.nbaType = 'success'
            this.snackBarDisplayInfo.message = `${this.createdHeroSuccessBaseMessage} ${response.result as string}`
          } else {
            this.snackBarDisplayInfo.nbaType = 'error'
            this.snackBarDisplayInfo.message = response.result as string
          }
          this.snackBar.openFromComponent(NbaComponent, {data: this.snackBarDisplayInfo})
          this.navigateBack()
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

  navigateBack() {
    this.router.navigate(['/heroes'])
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
    const SUPER_POWER_ACTIONABLE_LIST = [...this.heroForm.value.heroSuperpowerList];
    let newSuperpower: string;
    
    newSuperpower = this.heroForm.get('newSuperpower')?.value;
    newSuperpower.trim();
    if (!SUPER_POWER_ACTIONABLE_LIST.includes(newSuperpower)) {
      this.superpowerAlreadyExists = false;
      SUPER_POWER_ACTIONABLE_LIST.push(newSuperpower);
      this.heroForm.get('heroSuperpowerList')?.setValue(SUPER_POWER_ACTIONABLE_LIST);
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

  emitName(heroName : string) {
    this.nameEmitter.emit(heroName);
  }
}
