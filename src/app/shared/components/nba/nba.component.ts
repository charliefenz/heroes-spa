import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { NBAInput } from '../../../models/nbaInput';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nba',
  standalone: true,
  imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatIcon, NgClass],
  providers: [MatSnackBar],
  templateUrl: './nba.component.html',
  styleUrl: './nba.component.scss'
})
export class NbaComponent implements OnInit{
  showTimeout = 2500;
  iconsName = {
    info: 'info',
    success: 'check_circle',
    error: 'warning'
  };

  constructor(public snackBarRef: MatSnackBarRef<NbaComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: {nbaType: NBAInput['nbaType'], message: string}) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.snackBarRef.dismiss()
    }, this.showTimeout)
  }
}