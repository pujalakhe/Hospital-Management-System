import { TestBed } from '@angular/core/testing';
import { ChangePasswordFormService } from './change-password-form-service';
import { FormGroup } from '@angular/forms';

fdescribe('ChangePasswordFormService', () => {
  let service: ChangePasswordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordFormService],
    });
    service = TestBed.inject(ChangePasswordFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build a form with 3 controls: oldPassword, newPassword, confirmNewPassword', () => {
    const form = service.buildChangePasswordForm();
    expect(form).toBeInstanceOf(FormGroup);
    expect(form.contains('oldPassword')).toBeTrue();
    expect(form.contains('newPassword')).toBeTrue();
    expect(form.contains('confirmNewPassword')).toBeTrue();
  });

  it('should apply required validators to all fields', () => {
    const form = service.buildChangePasswordForm();
    const oldPassword = form.get('oldPassword');
    const newPassword = form.get('newPassword');
    const confirmNewPassword = form.get('confirmNewPassword');

    oldPassword?.setValue('');
    newPassword?.setValue('');
    confirmNewPassword?.setValue('');

    expect(oldPassword?.valid).toBeFalse();
    expect(newPassword?.valid).toBeFalse();
    expect(confirmNewPassword?.valid).toBeFalse();
  });

  it('should apply passwordMatchValidator to the form', () => {
    const form = service.buildChangePasswordForm();

    form.get('newPassword')?.setValue('123456');
    form.get('confirmNewPassword')?.setValue('654321');

    const errors = form.errors || {};
    expect(errors['passwordMismatch']).toBeTrue();

    // Matching passwords
    form.get('confirmNewPassword')?.setValue('123456');
    const errorsAfterMatch = form.errors || {};
    expect(errorsAfterMatch['passwordMismatch']).toBeUndefined();
  });
});
