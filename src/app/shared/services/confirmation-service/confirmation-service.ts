import { Injectable } from '@angular/core';

import { ConfirmationDialogComponent } from '../../components/confirmation-dialog-component/confirmation-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';
import {
  DIALOG_WIDTH,
  DialogActions,
  GENERIC_CONFIRM,
} from '../../constants/dialog.constants';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  //default values
  defaultData: ConfirmDialogData = {
    title: GENERIC_CONFIRM.TITLE,
    message: GENERIC_CONFIRM.MESSAGE,
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
