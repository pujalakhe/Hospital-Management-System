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

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: SNACKBAR_DURATION.SHORT,
    horizontalPosition: SNACKBAR_POSITION.HORIZONTAL,
    verticalPosition: SNACKBAR_POSITION.VERTICAL,
  };
  private show(
    message: string,
    type: SnackbarType = SNACKBAR_TYPE.INFO,
    action: SnackbarAction = SNACKBAR_ACTION.CLOSE,
    config?: MatSnackBarConfig
  ) {
    const configWithDefaults = {
      ...this.defaultConfig,
      panelClass: [`snackbar-${type}`],
      ...config,
    };
    this.snackBar.open(
      message,
      action ?? SNACKBAR_ACTION.CLOSE,
      configWithDefaults
    );
  }
  success(
    message: string,
    duration?: number,
    action?: SnackbarAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, SNACKBAR_TYPE.SUCCESS, action ?? SNACKBAR_ACTION.CLOSE, {
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
    this.show(message, SNACKBAR_TYPE.ERROR, action ?? SNACKBAR_ACTION.CLOSE, {
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
    this.show(message, SNACKBAR_TYPE.INFO, action ?? SNACKBAR_ACTION.CLOSE, {
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
    this.show(message, SNACKBAR_TYPE.ERROR, action ?? SNACKBAR_ACTION.CLOSE, {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }
}
