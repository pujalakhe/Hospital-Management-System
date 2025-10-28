import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
type NotificationType = 'success' | 'error' | 'info' | 'warning';
type NotificationAction = 'Close' | 'Undo';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };
  private show(
    message: string,
    type: NotificationType = 'info',
    action: NotificationAction = 'Close',
    config?: MatSnackBarConfig
  ) {
    const configWithDefaults = {
      ...this.defaultConfig,
      panelClass: [`snackbar-${type}`],
      ...config,
    };
    this.snackBar.open(message, action ?? 'Close', configWithDefaults);
  }
  success(
    message: string,
    duration?: number,
    action?: NotificationAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'success', action ?? 'Close', {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }

  error(
    message: string,
    duration?: number,
    action?: NotificationAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'error', action ?? 'Close', {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }

  info(
    message: string,
    duration?: number,
    action?: NotificationAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'info', action ?? 'Close', {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }

  warning(
    message: string,
    duration?: number,
    action?: NotificationAction,
    config?: MatSnackBarConfig
  ) {
    this.show(message, 'warning', action ?? 'Close', {
      ...config,
      ...(duration ? { duration } : {}),
    });
  }
}
