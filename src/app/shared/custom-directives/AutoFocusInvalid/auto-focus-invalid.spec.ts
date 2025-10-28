import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AutoFocusInvalid } from './auto-focus-invalid';

@Component({
  template: `
    <form [formGroup]="form" [appFocusInvalid]="form" appAutoFocusInvalid>
      <input formControlName="firstName" type="text" />
      <input formControlName="lastName" type="text" />
      <button type="submit">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, AutoFocusInvalid],
})
class TestHostComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
}

describe('AutoFocusInvalid Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance of the directive', () => {
    const directiveInstance = fixture.debugElement.query(
      By.directive(AutoFocusInvalid)
    );
    expect(directiveInstance).not.toBeNull();
  });

  it('should focus the first invalid input on form submit', () => {
    const firstInputDebug = fixture.debugElement.query(
      By.css('input[formControlName="firstName"]')
    );
    const firstInput: HTMLInputElement = firstInputDebug.nativeElement;

    spyOn(firstInput, 'focus');

    expect(component.form.invalid).toBeTrue();

    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    formEl.dispatchEvent(new Event('submit', { bubbles: true }));
    fixture.detectChanges();

    expect(firstInput.focus).toHaveBeenCalled();
  });

  it('should not focus anything if form is valid', () => {
    component.form.setValue({ firstName: 'John', lastName: 'Doe' });
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs.forEach((input) => spyOn(input.nativeElement, 'focus'));

    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    formEl.dispatchEvent(new Event('submit', { bubbles: true }));
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    inputs.forEach((input) => {
      expect(input.nativeElement.focus).not.toHaveBeenCalled();
    });
  });
});
