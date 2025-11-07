import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { checkInRequest } from '../../store/check-in-check-out.actions';
import { Observable } from 'rxjs';
import { CheckInCheckOutFormService } from '../../service/check-in-check-out-form-service/check-in-check-out-form-service';

@Component({
  selector: 'app-check-in-check-out-dialog-box-component',
  standalone: false,
  templateUrl: './check-in-check-out-dialog-box-component.html',
  styleUrl: './check-in-check-out-dialog-box-component.scss',
})
export class CheckInCheckOutDialogBoxComponent implements OnInit {
  checkInForm?: FormGroup;
  loading$?: Observable<boolean>;
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
  }
  buildForm() {
    this.checkInForm = this.checkInFormService.buildCheckInCheckOutForm();
  }

  getControl(controlName: string): FormControl {
    return this.checkInForm?.get(controlName) as FormControl;
  }
  onSubmit() {
    if (this.checkInForm?.invalid) return;
    const payload = this.checkInForm?.value;
    this.store.dispatch(checkInRequest({ payload }));
    // this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
