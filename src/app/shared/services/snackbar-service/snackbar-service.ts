import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  SNACKBAR_ACTION,
  SNACKBAR_DURATION,
  SNACKBAR_POSITION,
  SNACKBAR_TYPE,
} from '../../constants/snackbar.constants';

const { CLOSE } = SNACKBAR_ACTION;
const { SHORT } = SNACKBAR_DURATION;
const { HORIZONTAL, VERTICAL } = SNACKBAR_POSITION;
const { INFO } = SNACKBAR_TYPE;

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  defaultConfig: MatSnackBarConfig = {
    horizontalPosition: HORIZONTAL,
    verticalPosition: VERTICAL,
  };

  private show(message: string, panelClass: string, duration = SHORT) {
    this.snackbar.open(message, CLOSE, {
      ...this.defaultConfig,
      duration,
      panelClass: [panelClass],
    });
  }

  success(message: string, duration = SHORT) {
    this.show(message, 'snackbar-success', duration);
  }

  error(message: string, duration = SHORT) {
    this.show(message, 'snackbar-error', duration);
  }

  warning(message: string, duration = SHORT) {
    this.show(message, 'snackbar-warning', duration);
  }

  info(message: string, duration = SHORT) {
    this.show(message, 'snackbar-info', duration);
  }
}
