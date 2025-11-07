import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../../shared/services/base-form-service/base-form-service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignupRequest } from '../../models/signup.model';
import { minAgeValidator } from '../../../../../../shared/validators/date-validators';
@Injectable({
  providedIn: 'root',
})
export class SignupFormService extends BaseFormService {
  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }
  getFormValue(): SignupRequest {
    return this.form?.getRawValue() as SignupRequest;
  }

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  getAddressControl(controlName: 'name' | 'countryId' | 'cityId'): FormControl {
    return this.form?.get('address.' + controlName) as FormControl;
  }
}
