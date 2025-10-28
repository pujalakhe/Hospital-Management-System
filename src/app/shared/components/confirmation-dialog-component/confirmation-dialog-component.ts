import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../angular-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';
import {
  DIALOG_ACTIONS,
  DIALOG_ACTIONS_COLOR,
} from '../../constants/dialog.constant';

const { DELETE, UPDATE, ADD } = DIALOG_ACTIONS;
const { WARN, PRIMARY } = DIALOG_ACTIONS_COLOR;

@Component({
  selector: 'app-confirmation-dialog-component',
  imports: [MaterialModule, CommonModule],
  templateUrl: './confirmation-dialog-component.html',
  styleUrl: './confirmation-dialog-component.scss',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.data.action);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get icon(): string {
    return { delete: DELETE, update: UPDATE, add: ADD }[this.data.action];
  }

  get color(): string {
    return this.data.action === DELETE ? WARN : PRIMARY;
  }
}
