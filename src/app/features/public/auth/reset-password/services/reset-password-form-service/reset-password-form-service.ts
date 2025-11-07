import { Injectable } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { passwordStrengthValidator } from '../../../../../../shared/constants/password.validator';

@Injectable({ providedIn: 'root' })
export class ResetPasswordFormService {
  constructor(private fb: FormBuilder) {}

  buildEmailForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  buildVerifyForm(): FormGroup {
    const form = this.fb.group(
      {
        otp: ['', [Validators.required]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
    form.setValidators(this.passwordMatchValidator);
    return form;
  }

  getControl(
    name: string,
    emailForm: FormGroup,
    verifyForm: FormGroup
  ): FormControl {
    const map: any = {
      email: emailForm.get('email'),
      otp: verifyForm.get('otp'),
      newPassword: verifyForm.get('newPassword'),
      confirmPassword: verifyForm.get('confirmPassword'),
    };
    return map[name];
  }

  private passwordMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }
}
