import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../../shared/services/base-form-service/base-form-service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignupRequest } from '../../models/signup.model';

@Injectable({
  providedIn: 'root',
})
export class SignupFormService extends BaseFormService {
  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }

  initForm(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        mobileNo: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        address: this.formBuilder.group({
          name: ['', Validators.required],
          countryId: [0, Validators.required],
          cityId: [0, Validators.required],
        }),
        email: ['', [Validators.required, Validators.email]],
        citizenshipNo: ['', Validators.required],
        dob: ['', Validators.required],
        departmentId: [0, Validators.required],
        role: [0, Validators.required],
        gender: [0, Validators.required],
        nationality: ['', Validators.required],
        startDate: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  private passwordMatchValidator(group: any) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  getFormValue(): SignupRequest {
    return this.form?.getRawValue() as SignupRequest;
  }

  // Example: generic helper for top-level controls
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  // Example: helper for nested address group
  getAddressControl(controlName: 'name' | 'countryId' | 'cityId'): FormControl {
    return this.form?.get('address.' + controlName) as FormControl;
  }
}
