import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignupFormService } from '../service/form/signup-form-service';
import { Store } from '@ngrx/store';
import { SignupApiService } from '../service/api/signup-api-service';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';

@Component({
  selector: 'app-signup-component',
  standalone: false,
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent {
  constructor(
    public formService: SignupFormService,
    private store: Store,
    private signupApiService: SignupApiService
  ) {}
  ROUTER_PATHS = ROUTER_PATHS;
  countries = [
    { id: 1, name: 'Nepal' },
    { id: 2, name: 'India' },
    { id: 3, name: 'USA' },
  ];

  cities = [
    { id: 1, name: 'Kathmandu' },
    { id: 2, name: 'Pokhara' },
    { id: 3, name: 'Delhi' },
  ];

  departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Engineering' },
  ];

  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Employee' },
  ];

  nationalities = [
    { id: 1, name: 'Nepali' },
    { id: 2, name: 'Indian' },
    { id: 3, name: 'American' },
  ];

  ngOnInit(): void {
    this.formService.initForm();
  }

  onSubmit(): void {
    const form = this.formService.form;
    if (!form || form.invalid) {
      this.formService.applyTouchAndDirtyToForm();
      return;
    }

    const payload = this.formService.getFormValue();
    // this.store.dispatch(signup({ payload }));
  }
}
