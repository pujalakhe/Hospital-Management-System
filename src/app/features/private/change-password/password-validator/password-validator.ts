import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmNewPassword = formGroup.get('confirmNewPassword')?.value;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (
      (newPassword &&
        confirmNewPassword &&
        newPassword !== confirmNewPassword) ||
      (password && confirmPassword && password !== confirmPassword)
    ) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
