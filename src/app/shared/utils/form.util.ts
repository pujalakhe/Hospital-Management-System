import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { firstValueFrom } from 'rxjs';
import {
  DIALOG_WIDTH,
  UNSAVED_CHANGE_MESSAGE,
} from '../../shared/constants/dialog.constant';
import { LeavePageConfirmationDialogComponent } from '../../shared/components/leave-page-confirmation-dialog-component/leave-page-confirmation-dialog-component';

export function disableControls(
  form: FormGroup,
  controls: string[] | string
): void {
  const controlList = Array.isArray(controls) ? controls : [controls];

  controlList.forEach((controlName) => {
    const control = form.get(controlName);
    if (control) {
      control.disable({ emitEvent: false }); // disables without triggering valueChanges
    }
  });
}

export function enableControls(
  form: FormGroup,
  controls: string[] | string
): void {
  const controlList = Array.isArray(controls) ? controls : [controls];

  controlList.forEach((controlName) => {
    const control = form.get(controlName);
    if (control) {
      control.enable({ emitEvent: false }); // enables without triggering valueChanges
    }
  });
}
export function resetControls(
  form: FormGroup,
  controls: string[] | string
): void {
  if (!form) return;

  const controlNames = Array.isArray(controls) ? controls : [controls];

  controlNames.forEach((name) => {
    const control = form.get(name);
    if (control) {
      control.reset();
    } else {
      console.warn(`Control '${name}' not found in form.`);
    }
  });
}

export function confirmUnsavedChanges(
  formDirty: boolean,
  dialog: MatDialog,
  message = UNSAVED_CHANGE_MESSAGE
): Promise<boolean> {
  if (!formDirty) return Promise.resolve(true);

  const dialogRef = dialog.open(LeavePageConfirmationDialogComponent, {
    width: DIALOG_WIDTH,
    data: { message },
  });
  return firstValueFrom(dialogRef.afterClosed());
}
