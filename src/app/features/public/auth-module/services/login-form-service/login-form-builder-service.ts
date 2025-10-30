import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../shared/services/base-form-service/base-form-service';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginFormBuilderService extends BaseFormService {
  buildLoginForm(): void {
    this.buildForm({
      username: [null, Validators.required],
      password: ['', Validators.required],
    });
  }
}
