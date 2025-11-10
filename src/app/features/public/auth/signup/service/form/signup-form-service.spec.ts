import { TestBed } from '@angular/core/testing';
import { SignupFormService } from './signup-form-service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignupFormService', () => {
  let service: SignupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [SignupFormService],
    });
    service = TestBed.inject(SignupFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build signup form with all controls', () => {
    const form = service.buildSignupForm();
    expect(form.contains('firstName')).toBeTrue();
    expect(form.contains('lastName')).toBeTrue();
    expect(form.contains('email')).toBeTrue();
    expect(form.contains('password')).toBeTrue();
    expect(form.contains('confirmPassword')).toBeTrue();
    expect(form.get('address.name')).toBeTruthy();
  });

  it('should mark form invalid when required fields are empty', () => {
    const form = service.buildSignupForm();
    expect(form.valid).toBeFalse();
  });

  it('should alidate pasword pattern', () => {
    const form = service.buildSignupForm();
    const password = form.get('password');
    password?.setValue('ram');
    expect(password?.valid).toBeFalse();
    password?.setValue('Ram1*');
    expect(password?.valid).toBeTrue();
  });

  it('should validate password and confirm password match', () => {
    const form = service.buildSignupForm();
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    password?.setValue('Strong1!');
    confirmPassword?.setValue('Mismatch1!');
    expect(form.errors?.['passwordMismatch']).toBeTrue();

    confirmPassword?.setValue('Strong1!');
    expect(form.errors).toBeNull();
  });
});
