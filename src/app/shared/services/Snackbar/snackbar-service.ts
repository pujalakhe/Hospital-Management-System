import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  SNACKBAR_ACTION,
  SNACKBAR_DURATION,
  SNACKBAR_POSITION,
  SNACKBAR_TYPE,
  SnackbarAction,
  SnackbarType,
} from '../../constants/snackbar.constant';
const { CLOSE } = SNACKBAR_ACTION;
const { SHORT } = SNACKBAR_DURATION;
const { HORIZONTAL, VERTICAL } = SNACKBAR_POSITION;
const { SUCCESS, ERROR, INFO } = SNACKBAR_TYPE;

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
