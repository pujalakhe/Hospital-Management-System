import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResetPasswordFormService } from '../services/reset-password-form-service/reset-password-form-service';
import * as ResetPasswordActions from '../store/reset-password.action';
import {
  selectSendOTPLoading,
  selectResetPasswordLoading,
  selectSendOTPSuccess,
} from '../store/reset-password.selector';

import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';

import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password-component.html',
  styleUrls: ['./reset-password-component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  routerPaths = ROUTER_PATHS;
  emailForm!: FormGroup;
  verifyForm!: FormGroup;

  sendOTPLoading$!: Observable<boolean>;
  resetPasswordLoading$!: Observable<boolean>;

  constructor(
    private formService: ResetPasswordFormService,
    private store: Store
  ) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.buildResetForm();
    this.otpLoading();
    

    this.store
      .select(selectSendOTPSuccess)
      .pipe(
        filter((success) => success === true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (this.emailForm.valid) {
          this.stepper.next();
        }
      });
  }

  buildResetForm(): void {
    this.emailForm = this.formService.buildEmailForm();
    this.verifyForm = this.formService.buildVerifyForm();
  }

  otpLoading(): void {
    this.sendOTPLoading$ = this.store.select(selectSendOTPLoading);
    this.resetPasswordLoading$ = this.store.select(selectResetPasswordLoading);
  }

  getControlFrom(form: FormGroup, controlName: string) {
    return form.get(controlName) as FormControl;
  }

  onRequestOtp() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.store.dispatch(
        ResetPasswordActions.requestOtp({ payload: { email } })
      );
    }
  }

  onResetPassword() {
    if (this.verifyForm.valid) {
      const { otp, newPassword } = this.verifyForm.value;
      const { email } = this.emailForm.value;

      this.store.dispatch(
        ResetPasswordActions.resetPassword({
          payload: {
            email,
            otp,
            newPassword,
          },
        })
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
