import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { disableControls, enableControls } from '../../utils/form.util';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseFormService {
  #formGroup?: FormGroup;

  protected constructor(protected formBuilder: FormBuilder) {}

  get form(): FormGroup | undefined {
    return this.#formGroup;
  }

  set form(formGroup: FormGroup | undefined) {
    this.#formGroup = formGroup;
  }

  reset(): void {
    this.form?.reset();
  }

  buildForm<T extends object>(
    config: T,
    options?: AbstractControlOptions | null
  ): FormGroup {
    this.form = this.formBuilder.group(config, options);
    return this.form;
  }

  applyTouchAndDirtyToForm(): void {
    this.form?.markAllAsTouched();
    this.form?.markAsDirty();
  }

  resetForm(): void {
    this.form = new FormGroup({});
  }

  disableControls(controls: string[] | string): void {
    if (!this.form) {
      return;
    }
    disableControls(this.form, controls);
  }

  enableControls(controls: string[] | string): void {
    if (!this.form) {
      return;
    }
    enableControls(this.form, controls);
  }
}
