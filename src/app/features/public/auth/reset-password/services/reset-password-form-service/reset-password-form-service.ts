import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ResetPasswordFormService {
  constructor(private fb: FormBuilder) {}

  buildEmailForm() { return this.fb.group({ email: ['', [Validators.required, Validators.email]] }); }
  buildOtpForm() { return this.fb.group({ otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]] }); }
  buildPasswordForm() {
    const form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    });
    form.setValidators(this.passwordMatchValidator);
    return form;
  }

  getControl(name: string, emailForm: FormGroup, otpForm: FormGroup, passwordForm: FormGroup): FormControl {
    const map: any = {
      email: emailForm.get('email'),
      otp: otpForm.get('otp'),
      newPassword: passwordForm.get('newPassword'),
      confirmPassword: passwordForm.get('confirmPassword')
    };
    return map[name];
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const valid = /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return valid ? null : { passwordStrength: true };
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }
}
