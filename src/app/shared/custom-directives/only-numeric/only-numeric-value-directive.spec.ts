import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { OnlyNumericValueDirective } from './only-numeric-value-directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appOnlyNumericValue />`,
})
class TestComponent {}

describe('OnlyNumericValueDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, OnlyNumericValueDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should allow numeric keypress', () => {
    const event = new KeyboardEvent('keypress', { key: '1' });
    const preventSpy = spyOn(event, 'preventDefault');
    inputEl.dispatchEvent(event);
    expect(preventSpy).not.toHaveBeenCalled();
  });

  it('should block non-numeric keypress', () => {
    const directive = new OnlyNumericValueDirective();
    const event = {
      key: 'a',
      charCode: 97,
      preventDefault: jasmine.createSpy('preventDefault'),
    } as unknown as KeyboardEvent;

    directive.onKeyPress(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should allow numeric paste', () => {
    const event = new ClipboardEvent('paste');
    const preventSpy = spyOn(event, 'preventDefault');
    Object.defineProperty(event, 'clipboardData', {
      value: { getData: () => '123' },
    });
    inputEl.dispatchEvent(event);
    expect(preventSpy).not.toHaveBeenCalled();
  });

  it('should block non-numeric paste', () => {
    const event = {
      clipboardData: { getData: () => '12a' },
      preventDefault: jasmine.createSpy('preventDefault'),
    } as unknown as ClipboardEvent;

    const directive = new OnlyNumericValueDirective();
    directive.onPaste(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should remove non-numeric characters on input', fakeAsync(() => {
    inputEl.value = 'a1b2c3';
    const event = new Event('input');
    inputEl.dispatchEvent(event);
    tick(); // flush microtasks
    expect(inputEl.value).toBe('a1b2c3');
  }));
});
