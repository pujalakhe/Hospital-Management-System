import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  SNACKBAR_ACTION,
  SNACKBAR_DURATION,
  SNACKBAR_POSITION,
  SNACKBAR_TYPE,
} from '../../constants/snackbar.constant';
const { CLOSE } = SNACKBAR_ACTION;
const { SHORT } = SNACKBAR_DURATION;
const { HORIZONTAL, VERTICAL } = SNACKBAR_POSITION;
const { INFO } = SNACKBAR_TYPE;

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  defaultConfig: MatSnackBarConfig = {
    horizontalPosition: HORIZONTAL,
    verticalPosition: VERTICAL,
  };

  show(message: string, type: string = INFO, duration: number = SHORT) {
    this.snackBar.open(message, CLOSE, { ...this.defaultConfig, duration });
  }
}
