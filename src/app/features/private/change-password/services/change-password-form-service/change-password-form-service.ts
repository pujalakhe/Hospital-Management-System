import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../shared/services/base-form-service/base-form-service';
import { Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../password-validator/password-validator';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordFormService extends BaseFormService {
  buildChangePasswordForm() {
    const config = {
      oldPassword: ['', [Validators.required]],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    };

    const form = this.buildForm(config);

    form.setValidators(passwordMatchValidator());

    return form;
  }
}
