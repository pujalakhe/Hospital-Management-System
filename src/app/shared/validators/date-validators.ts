import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noFutureDateValidator(): ValidatorFn {
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

    if (inputYear > currentYear) {
      return { futureDateNotAllowed: true };
    }

    if (inputYear === currentYear && inputMonth > currentMonth) {
      return { futureDateNotAllowed: true };
    }

    if (
      inputYear === currentYear &&
      inputMonth === currentMonth &&
      inputDay > currentDay
    ) {
      return { futureDateNotAllowed: true };
    }
    return null;
  };
}
