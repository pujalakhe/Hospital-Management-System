import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  SnackbarAction,
  SNACKBAR_POSITION,
  SnackbarType,
  SNACKBAR_DURATION,
  SNACKBAR_TYPE,
  SNACKBAR_ACTION,
} from '../../constants/snackbar-constants/snackbar.constants';

const { CLOSE } = SNACKBAR_ACTION;
const { SUCCESS, ERROR, INFO } = SNACKBAR_TYPE;
const { HORIZONTAL, VERTICAL } = SNACKBAR_POSITION;
const { SHORT, MEDIUM, LONG } = SNACKBAR_DURATION;
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}
  private defaultConfig: MatSnackBarConfig = {
    duration: SHORT,
    horizontalPosition: HORIZONTAL,
    verticalPosition: VERTICAL,
  };
  private show(
    message: string,
    type: SnackbarType = INFO,
    action: SnackbarAction = CLOSE,
    config?: MatSnackBarConfig
  ) {
    const configWithDefaults = {
      ...this.defaultConfig,
      panelClass: [`snackbar-${type}`],
      ...config,
    };
    this.snackBar.open(message, action ?? CLOSE, configWithDefaults);
  }
  success(
    message: string,
    duration?: number,
    action?: SnackbarAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, SUCCESS, action ?? CLOSE, {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }

  error(
    message: string,
    duration?: number,
    action?: SnackbarAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, ERROR, action ?? CLOSE, {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }

  info(
    message: string,
    duration?: number,
    action?: SnackbarAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, INFO, action ?? CLOSE, {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }

  warning(
    message: string,
    duration?: number,
    action?: SnackbarAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, ERROR, action ?? CLOSE, {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }
}
