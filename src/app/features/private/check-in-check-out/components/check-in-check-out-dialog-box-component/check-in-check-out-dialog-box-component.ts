import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  checkInRequest,
  checkOutRequest,
} from '../../store/check-in-check-out.actions';
import { firstValueFrom, Observable } from 'rxjs';
import { CheckInCheckOutFormService } from '../../service/check-in-check-out-form-service/check-in-check-out-form-service';
import {
  selectCheckedInStatus,
  selectError,
  selectLoading,
} from '../../store/check-in-check-out.selectors';

@Component({
  selector: 'app-check-in-check-out-dialog-box-component',
  standalone: false,
  templateUrl: './check-in-check-out-dialog-box-component.html',
  styleUrl: './check-in-check-out-dialog-box-component.scss',
})
export class CheckInCheckOutDialogBoxComponent implements OnInit {
  checkInCheckOutForm?: FormGroup;
  loading$?: Observable<boolean>;
  checkInStatus$?: Observable<boolean>;
  error$?: Observable<string | null>;
  workLocationOptions: { id: number; name: string }[] = [
    { id: 1, name: 'Work from office' },
    { id: 2, name: 'Work from home' },
  ];

  constructor(
    private dialogRef: MatDialogRef<CheckInCheckOutDialogBoxComponent>,
    private checkInFormService: CheckInCheckOutFormService,
    private store: Store
  ) {}

  ngOnInit() {
    this.buildForm();
    this.initializeSelectors();
  }
  buildForm() {
    this.checkInCheckOutForm =
      this.checkInFormService.buildCheckInCheckOutForm();
  }

  initializeSelectors() {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.checkInStatus$ = this.store.select(selectCheckedInStatus);
    this.store
      .select(selectCheckedInStatus)
      .subscribe((res) => console.log(res));
    this.renderFormAsPerTheStatus();
  }

  renderFormAsPerTheStatus() {
    this.checkInStatus$?.subscribe((status) => {
      if (!status) {
        // Check In
        this.getControl('checkInReason').setValidators([Validators.required]);
        this.getControl('workLocation').setValidators([Validators.required]);
        this.getControl('checkOutReason').clearValidators();
      } else {
        // Check Out
        this.getControl('checkOutReason').setValidators([Validators.required]);
        this.getControl('checkInReason').clearValidators();
        this.getControl('workLocation').clearValidators();
      }

      // Update validity after changing validators
      this.checkInCheckOutForm?.updateValueAndValidity();
    });
  }

  getControl(controlName: string): FormControl {
    return this.checkInCheckOutForm?.get(controlName) as FormControl;
  }

  onSubmit() {
    this.checkInCheckOutForm?.updateValueAndValidity();
    if (this.checkInCheckOutForm?.invalid) return;
    const payload = this.checkInCheckOutForm?.value;
    console.log(payload);
    this.store.dispatch(checkInRequest({ payload }));
    // this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
