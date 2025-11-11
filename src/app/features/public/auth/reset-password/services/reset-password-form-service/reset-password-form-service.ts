import { Injectable } from '@angular/core';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { BaseFormService } from '../../../../../../shared/services/base-form-service/base-form-service';
import { passwordStrengthValidator } from '../../../../../../shared/validators/password.validator';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordFormService extends BaseFormService {
  buildEmailForm() {
    const config = {
      email: ['', [Validators.required, Validators.email]],
    };

    return this.buildForm(config);
  }

  buildVerifyForm() {
    const config = {
      otp: ['', [Validators.required]],
      newPassword: [
        '',
        [Validators.required, Validators.minLength(8), passwordStrengthValidator],
      ],
      confirmPassword: ['', Validators.required],
    };

    const form = this.buildForm(config, { validators: this.passwordMatchValidator });
    return form;
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }
}

