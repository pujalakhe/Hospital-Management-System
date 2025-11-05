import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../../shared/services/base-form-service/base-form-service';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService extends BaseFormService {
  buildLoginForm() {
    const config = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    };

    return this.buildForm(config);
  }
}
