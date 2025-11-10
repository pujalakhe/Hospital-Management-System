import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../../shared/services/base-form-service/base-form-service';
import { Validators } from '@angular/forms';
import { minAgeValidator } from '../../../../../../shared/validators/date-validators';
import { passwordMatchValidator } from '../../../../../private/change-password/password-validator/password-validator';
import { REGEX } from '../../constants/signup.constant';
@Injectable({
  providedIn: 'root',
})
export class SignupFormService extends BaseFormService {
  buildSignupForm() {
    const config = {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]],
      address: this.formBuilder.group({
        name: ['', Validators.required],
        countryId: [null, Validators.required],
        cityId: [null, Validators.required],
      }),
      email: ['', [Validators.required, Validators.email]],
      citizenshipNo: ['', Validators.required],
      dob: ['', [Validators.required, minAgeValidator(18)]],
      departmentId: [null, Validators.required],
      role: [null, Validators.required],
      gender: [null, Validators.required],
      nationality: ['', Validators.required],
      startDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
      confirmPassword: ['', Validators.required],
    };
    const form = this.buildForm(config);
    form.setValidators(passwordMatchValidator());
    return form;
  }
}
