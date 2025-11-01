import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../angular-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-page-confirmation-dialog-component',
  imports: [MaterialModule],
  templateUrl: './leave-page-confirmation-dialog-component.html',
  styleUrl: './leave-page-confirmation-dialog-component.scss',
})
export class LeavePageConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<LeavePageConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
