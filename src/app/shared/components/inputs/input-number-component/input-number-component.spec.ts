import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../../angular-material.module';
import { DebugElement } from '@angular/core';

import { InputNumberComponent } from './input-number-component';
import { OnlyNumericValueDirective } from '../../../custom-directives/only-numeric/only-numeric-value-directive';

describe('InputNumberComponent', () => {
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;
  let inputEl: HTMLInputElement;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        InputNumberComponent,
        OnlyNumericValueDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputNumberComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.label = 'Age';
    component.placeholder = 'Enter age';
    component.min = 0;

    fixture.detectChanges();
    debugEl = fixture.debugElement.query(By.css('input'));
    inputEl = debugEl.nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind label and placeholder correctly', () => {
    const labelEl = fixture.debugElement.query(
      By.css('mat-label')
    ).nativeElement;
    expect(labelEl.textContent.trim()).toBe('Age');
    expect(inputEl.getAttribute('placeholder')).toBe('Enter age');
  });

  it('should have formControl binding', () => {
    component.control?.setValue('25');
    fixture.detectChanges();
    expect(inputEl.value).toBe('25');
  });

  it('should apply appOnlyNumericValue directive', () => {
    const directives = debugEl.injector.get(OnlyNumericValueDirective, null);
    expect(directives).toBeTruthy();
  });

  it('should restrict non-numeric input via directive', () => {
    const directive = debugEl.injector.get(OnlyNumericValueDirective);
    const event = {
      key: 'a',
      charCode: 97,
      preventDefault: jasmine.createSpy('preventDefault'),
    } as unknown as KeyboardEvent;

    directive.onKeyPress(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
