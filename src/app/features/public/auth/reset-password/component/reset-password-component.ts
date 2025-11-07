import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResetPasswordFormService } from '../services/reset-password-form-service/reset-password-form-service';
import * as ResetPasswordActions from '../store/reset-password.action';
import { ResetPasswordState } from '../store/reset-password.reducer';
import {
  selectSendOTPLoading,
  selectResetPasswordLoading
} from '../store/reset-password.selector';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password-component.html',
  styleUrls: ['./reset-password-component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  passwordForm!: FormGroup;

  sendOTPLoading$!: Observable<boolean>;
  verifyOTPLoading$!: Observable<boolean>;
resetPasswordLoading$!: Observable<boolean>;
  

  constructor(
    private formService: ResetPasswordFormService,
    private store: Store<{ resetPassword: ResetPasswordState }>
  ) {}

  ngOnInit() {
    this.emailForm = this.formService.buildEmailForm();
    this.otpForm = this.formService.buildOtpForm();
    this.passwordForm = this.formService.buildPasswordForm();
    this.sendOTPLoading$ = this.store.select(selectSendOTPLoading);
    this.verifyOTPLoading$ = this.store.select(selectSendOTPLoading);
    this.resetPasswordLoading$ = this.store.select(selectResetPasswordLoading);
  }

  getControl(name: string) {
    return this.formService.getControl(
      name,
      this.emailForm,
      this.otpForm,
      this.passwordForm
    );
  }

  onRequestOtp() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.store.dispatch(ResetPasswordActions.requestOtp({ email }));
    }
  }

  

  onResetPassword() {
    if (this.passwordForm.valid && this.otpForm.valid) {
      const { newPassword } = this.passwordForm.value;
      const { otp } = this.otpForm.value;
      const { email } = this.emailForm.value;

      this.store.dispatch(
        ResetPasswordActions.resetPassword({
          email,
          otp,
          newPassword,
        })
      );
    }
  }
}
