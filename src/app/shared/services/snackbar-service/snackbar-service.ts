import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };
  show(
    message: string,
    type: NotificationType = 'info',
    action = 'Close',
    config?: MatSnackBarConfig
  ) {
    const configWithDefaults = {
      ...this.defaultConfig,
      panelClass: [`snackbar-${type}`],
      ...config,
    };
    this.snackBar.open(message, action, configWithDefaults);
  }
  success(
    message: string,
    duration?: number,
    action = 'Close',
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'success', action, { ...config, duration });
  }

  error(
    message: string,
    duration?: number,
    action = 'Close',
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'error', action, { ...config, duration });
  }

  info(
    message: string,
    duration?: number,
    action = 'Close',
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'info', action, { ...config, duration });
  }

  warning(
    message: string,
    duration?: number,
    action = 'Close',
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'warning', action, { ...config, duration });
  }
}
