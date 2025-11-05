import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormService } from '../../../../../../shared/services/base-form-service/base-form-service';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordFormService extends BaseFormService {

  /** Step 1: Email Form */
  buildEmailForm() {
    const config = {
      email: ['', [Validators.required, Validators.email]],
    };
    return this.buildForm(config);
  }

  /** Step 2: OTP Form */
  buildOtpForm() {
    const config = {
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    };
    return this.buildForm(config);
  }

  /** Step 3: Password Form */
  buildPasswordForm() {
    const config = {
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordStrengthValidator,
        ],
      ],
      confirmPassword: ['', Validators.required],
    };

    // Use base class method, then set cross-field validator for password match
    const form = this.buildForm(config);
    form.setValidators(this.passwordMatchValidator);
    return form;
  }

  /** Validator: Password Strength */
  private passwordStrengthValidator(control: any) {
    const value = control.value || '';
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return hasUpper && hasLower && hasNumber && hasSpecial
      ? null
      : { passwordStrength: true };
  }

  /** Validator: Password Match */
  private passwordMatchValidator(form: any) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
