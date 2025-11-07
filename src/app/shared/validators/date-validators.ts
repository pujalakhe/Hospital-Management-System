import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minAgeValidator(minAge: number = 18): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const dateString =
      value instanceof Date ? value.toISOString().split('T')[0] : value;

    const [year, month, day] = dateString.split('-').map(Number);

    const inputYear = year;
    const inputMonth = month;
    const inputDay = day;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    let age = currentYear - inputYear;
    if (
      inputMonth > currentMonth ||
      (inputMonth === currentMonth && inputDay > currentDay)
    ) {
      age--;
    }

    if (age < minAge) {
      return { minAgeNotMet: { requiredAge: minAge, actualAge: age } };
    }
    return null;
  };
}
