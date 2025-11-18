import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  checkInRequest,
  checkOutRequest,
} from '../../store/check-in-check-out.actions';
import { filter, firstValueFrom, Observable, take } from 'rxjs';
import { CheckInCheckOutFormService } from '../../service/check-in-check-out-form-service/check-in-check-out-form-service';
import {
  selectCheckedInStatus,
  selectError,
  selectLoading,
} from '../../store/check-in-check-out.selectors';
import { setValidators } from '../../../../../shared/utils/form.util';

@Component({
  selector: 'app-check-in-check-out-dialog-box-component',
  standalone: false,
  templateUrl: './check-in-check-out-dialog-box-component.html',
  styleUrl: './check-in-check-out-dialog-box-component.scss',
})
export class CheckInCheckOutDialogBoxComponent implements OnInit {
  checkInCheckOutForm?: FormGroup;
  loading$?: Observable<boolean>;
  checkInStatus$?: Observable<boolean | null>;
  error$?: Observable<string | null>;
  currentStatus: boolean | null = null;
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
    this.#buildForm();
    this.#initializeSelectors();
    this.loadCheckInStatus();
    this.#setupFormValidators(this.currentStatus);
  }

  #buildForm() {
    this.checkInCheckOutForm =
      this.checkInFormService.buildCheckInCheckOutForm();
  }

  #initializeSelectors() {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.checkInStatus$ = this.store.select(selectCheckedInStatus);
  }

  loadCheckInStatus() {
    this.checkInStatus$?.pipe(take(1)).subscribe((status) => {
      this.currentStatus = status;
    });
  }

  #setupFormValidators(status: boolean | null) {
    this.checkInFormService.setValidatorsByStatus(
      this.checkInCheckOutForm!,
      status
    );
  }

  onSubmit(status: boolean | null) {
    if (this.checkInCheckOutForm?.invalid) return;

    const payload = this.checkInCheckOutForm?.value;

    const action = status ? checkOutRequest : checkInRequest;

    this.store.dispatch(action({ payload }));

    this.waitUntilLoadingFalse();
  }

  waitUntilLoadingFalse() {
    this.loading$
      ?.pipe(
        filter((loading) => loading === false), // wait until loading is false
        take(1) // automatically unsubscribe after the first false
      )
      .subscribe(() => {
        this.dialogRef.close(true); // close only after loading is finished
      });
  }

  getControl(controlName: string): FormControl {
    return this.checkInCheckOutForm?.get(controlName) as FormControl;
  }

  close() {
    this.dialogRef.close(false);
  }
}
