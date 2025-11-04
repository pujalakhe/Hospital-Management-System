import { FormGroup } from '@angular/forms';

export function disableControls(
  form: FormGroup,
  controls: string[] | string
): void {
  const controlList = Array.isArray(controls) ? controls : [controls];

  controlList.forEach((controlName) => {
    const control = form.get(controlName);
    if (control) {
      control.disable({ emitEvent: false }); // disables without triggering valueChanges
    }
  });
}

export function enableControls(
  form: FormGroup,
  controls: string[] | string
): void {
  const controlList = Array.isArray(controls) ? controls : [controls];

  controlList.forEach((controlName) => {
    const control = form.get(controlName);
    if (control) {
      control.enable({ emitEvent: false }); // enables without triggering valueChanges
    }
  });
}
export function resetControls(
  form: FormGroup,
  controls: string[] | string
): void {
  if (!form) return;

  const controlNames = Array.isArray(controls) ? controls : [controls];

  controlNames.forEach((name) => {
    const control = form.get(name);
    if (control) {
      control.reset();
    } else {
      console.warn(`Control '${name}' not found in form.`);
    }
  });
}
