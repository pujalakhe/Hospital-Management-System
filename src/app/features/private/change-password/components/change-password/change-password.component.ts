import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ChangePasswordActions from '../../store/change-password/changePassword.action';
import * as ChangePasswordSelectors from '../../store/change-password/changePassword.selector';
import { ChangePasswordFormService } from '../../services/change-password-form-service/change-password-form-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm?: FormGroup;
  isLoading$?: Observable<boolean>;

  constructor(
    private changePasswordFormService: ChangePasswordFormService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.observeLoadingState();
  }

  initializeForm(): void {
    this.changePasswordForm =
      this.changePasswordFormService.buildChangePasswordForm();
  }
  observeLoadingState(): void {
    this.isLoading$ = this.store.select(
      ChangePasswordSelectors.selectIsLoading
    );
  }

  getControl(controlName: string): FormControl {
    return this.changePasswordForm?.get(controlName) as FormControl;
  }

  onSubmit(): void {
    if (this.changePasswordForm?.invalid) {
      this.changePasswordFormService.applyTouchAndDirtyToForm();
      return;
    }

    const { oldPassword, newPassword } = this.changePasswordForm?.value;

    this.store.dispatch(
      ChangePasswordActions.changePassword({
        credentials: { oldPassword, newPassword },
      })
    );
  }
}
