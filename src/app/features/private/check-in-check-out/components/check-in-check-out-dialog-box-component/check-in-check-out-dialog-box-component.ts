import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckInFormService } from '../../service/checkIn-form/check-in-form-service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-in-check-out-dialog-box-component',
  standalone: false,
  templateUrl: './check-in-check-out-dialog-box-component.html',
  styleUrl: './check-in-check-out-dialog-box-component.scss',
})
export class CheckInCheckOutDialogBoxComponent implements OnInit {
  checkInForm?: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<CheckInCheckOutDialogBoxComponent>,
    private checkInFormService: CheckInFormService
  ) {}
  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.checkInForm = this.checkInFormService.buildCheckInForm();
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  close() {
    this.dialogRef.close(false);
  }
  getControl(controlName: string): FormControl {
    return this.checkInForm?.get(controlName) as FormControl;
  }
  onSubmit() {
    if (this.checkInForm?.invalid) return;

    const payload = this.checkInForm?.value;

    console.log(payload);
  }
}
