import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../../../models/hero';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NbaComponent } from '../../../../shared/components/nba/nba.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageInputDialogComponent } from '../image-input-dialog/image-input-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnChanges, OnDestroy{
  @Input() hero: Hero | undefined;
  @Output() nameEmitter: EventEmitter<string> = new EventEmitter();
  heroForm: FormGroup;
  editBehavior = false;
  activateSpinner = false;
  createdHeroSuccessBaseMessage = 'Se ha creado el héroe con el id';
  snackBarDisplayInfo = {
    nbaType: 'success',
    message: ''
  };
  displayAsRequired = true;
  // FEAT Possible extraction of superpower handling logistic to a separate component
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  superpowers: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private heroesService: HeroesService, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.heroForm = this.formBuilder.group({
      heroImage: ['', Validators.required],
      heroName: ['', Validators.required],
      heroStatus: [true],
      heroAge: [null, [Validators.required, Validators.min(1)]],
      heroSuperpowerList: [[]],
      newSuperpower: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero'] && changes['hero'].currentValue !== changes['hero'].previousValue) {
      this.editBehavior = false;
      if (this.hero) {
        this.supplyFormValuesWithHeroDetails();
        this.superpowers = this.hero?.superpowers as string[];
        this.heroForm.disable();
        this.displayAsRequired = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub => {
      sub.unsubscribe();
    }))
  }

  supplyFormValuesWithHeroDetails(): void {
    this.heroForm.patchValue({
      heroImage: this.hero?.image,
      heroName: this.hero?.name,
      heroStatus: this.hero?.isActive,
      heroAge: this.hero?.age,
    })
  }

  onSubmit() {
    let hero: Hero;
    let editHeroSub: Subscription;

    if (this.heroForm.valid) {
      this.activateSpinner = true;
      hero = this.setHeroObject(this.editBehavior);
      if (this.editBehavior) {
          editHeroSub = this.heroesService.editHero(hero).subscribe((response) => {
          this.activateSpinner = false;
          if (response.code === 200) {
            this.emitName(hero.name);
            this.heroForm.disable();
            this.displayAsRequired = false;
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
          editHeroSub = this.heroesService.createHero(hero).subscribe((response) => {
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
      this.subscriptions.push(editHeroSub);
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
      superpowers: this.superpowers,
    }
    return HERO
  }

  navigateBack() {
    this.router.navigate(['/heroes'])
  }

  cancel() {
    if (this.editBehavior && this.hero) {
      this.heroForm.disable();
      this.displayAsRequired = false;
      this.supplyFormValuesWithHeroDetails();
      this.superpowers = this.hero?.superpowers as string[];
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

  openImageInputDialog() {
    let dialogRef: MatDialogRef<ImageInputDialogComponent>
    let dialogRefSub: Subscription;

    if (!this.heroForm.disabled) {
      dialogRef = this.dialog.open(ImageInputDialogComponent);
      dialogRefSub = dialogRef.afterClosed().subscribe(imgUrl => {
        if (imgUrl !== "") {
          this.heroForm.get('heroImage')?.patchValue(imgUrl);
        }
      });
      this.subscriptions.push(dialogRefSub);
    }
  }

// FEAT Possible extraction of superpower handling logistic to a separate component
  addPower(event: MatChipInputEvent) {
    const SUPER_POWER_ACTIONABLE_LIST = [...this.superpowers];
    let value = (event.value || '').trim();

    if (value) {
      SUPER_POWER_ACTIONABLE_LIST.push(value);
      this.superpowers = SUPER_POWER_ACTIONABLE_LIST;
    }
    event.chipInput!.clear();
  }

  removePower(power: string) {
    const SUPER_POWER_ACTIONABLE_LIST = [...this.superpowers];
    let index = SUPER_POWER_ACTIONABLE_LIST.indexOf(power);

    if (index >= 0) {
      SUPER_POWER_ACTIONABLE_LIST.splice(index, 1);
      this.superpowers = SUPER_POWER_ACTIONABLE_LIST;
    }
  }

  editPower(power: string, event: MatChipEditedEvent) {
    const SUPER_POWER_ACTIONABLE_LIST = [...this.superpowers];
    let value = event.value.trim();
    let index;

    // Remove power if it no longer has a name
    if (!value) {
      this.removePower(power);
      return;
    }
    // Edit existing power
    index = SUPER_POWER_ACTIONABLE_LIST.indexOf(power); 
    if (index >= 0) {
      SUPER_POWER_ACTIONABLE_LIST[index] = value;
      this.superpowers = SUPER_POWER_ACTIONABLE_LIST;
    }
  }
}
