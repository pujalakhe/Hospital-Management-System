import { TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { LoginFormService } from './login-form-service';
import { BaseFormService } from '../../../../../../shared/services/base-form-service/base-form-service';

describe('LoginFormService', () => {
  let service: LoginFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [LoginFormService, BaseFormService],
    });

    service = TestBed.inject(LoginFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build a form with email and password controls', () => {
    const form = service.buildLoginForm();

    expect(form).toBeInstanceOf(FormGroup);
    expect(form.contains('email')).toBeTrue();
    expect(form.contains('password')).toBeTrue();
  });

  it('should have required and email validators for email control', () => {
    const form = service.buildLoginForm();
    const emailControl = form.get('email') as FormControl;

    emailControl.setValue('');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.hasError('required')).toBeTrue();

    emailControl.setValue('invalid-email');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.hasError('email')).toBeTrue();

    emailControl.setValue('test@test.com');
    expect(emailControl.valid).toBeTrue();
  });

  it('should have required validator for password control', () => {
    const form = service.buildLoginForm();
    const passwordControl = form.get('password') as FormControl;

    passwordControl.setValue('');
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.hasError('required')).toBeTrue();

    passwordControl.setValue('123456');
    expect(passwordControl.valid).toBeTrue();
  });
});
