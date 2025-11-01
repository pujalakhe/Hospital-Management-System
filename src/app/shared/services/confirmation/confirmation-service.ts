import { Injectable } from '@angular/core';

import { ConfirmationDialogComponent } from '../../components/confirmation-dialog-component/confirmation-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';
import { DIALOG_WIDTH } from '../../constants/dialog.constant';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  confirm(data: ConfirmDialogData) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: DIALOG_WIDTH,
      data,
    });
    return dialogRef.afterClosed();
  }
}
