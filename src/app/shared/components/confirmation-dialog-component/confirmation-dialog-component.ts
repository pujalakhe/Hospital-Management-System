import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../angular-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';
import {} from '../../constants/dialog.constant';

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
}
