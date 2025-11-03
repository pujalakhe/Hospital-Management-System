import { Injectable } from '@angular/core';

import { ConfirmationDialogComponent } from '../../components/confirmation-dialog-component/confirmation-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';
import { DIALOG_WIDTH, DialogActions } from '../../constants/dialog.constant';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  //default values
  defaultData: ConfirmDialogData = {
    title: 'Unsaved Changes',
    message: 'Are you sure you want to leave',
    action: DialogActions.Stay,
    cancelBtn: DialogActions.Leave,
  };
  confirm(data: ConfirmDialogData) {
    //merged default value with passed data
    const dialogData = { ...this.defaultData, ...data };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: DIALOG_WIDTH,
      data: dialogData,
    });
    return dialogRef.afterClosed();
  }
}
