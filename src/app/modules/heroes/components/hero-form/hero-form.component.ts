import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {
  heroForm: FormGroup;
  addingNewSuperpower = false;
  superpowerAlreadyExists = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.heroForm = this.formBuilder.group({
      heroImage: ['', Validators.required],
      heroName: ['', Validators.required],
      heroStatus: ['Active', Validators.required],
      heroAge: [null, [Validators.required, Validators.min(1)]],
      heroSuperpowerList: [[]],
      newSuperpower: ['']
    });
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
  
}
