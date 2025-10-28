import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      declarations: [TestComponent, OnlyNumericValueDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should allow numeric keypress', () => {
    const event = new KeyboardEvent('keypress', { charCode: 49 }); // '1'
    const preventSpy = spyOn(event, 'preventDefault');
    inputEl.dispatchEvent(event);
    expect(preventSpy).not.toHaveBeenCalled();
  });

  it('should block non-numeric keypress', () => {
    const event = new KeyboardEvent('keypress', { charCode: 97 }); // 'a'
    const preventSpy = spyOn(event, 'preventDefault');
    inputEl.dispatchEvent(event);
    expect(preventSpy).toHaveBeenCalled();
  });

  it('should allow numeric paste', () => {
    const clipboardData = new DataTransfer();
    clipboardData.setData('text', '123');
    const event = new ClipboardEvent('paste', { clipboardData });
    const preventSpy = spyOn(event, 'preventDefault');
    inputEl.dispatchEvent(event);
    expect(preventSpy).not.toHaveBeenCalled();
  });

  it('should block non-numeric paste', () => {
    const clipboardData = new DataTransfer();
    clipboardData.setData('text', '12a');
    const event = new ClipboardEvent('paste', { clipboardData });
    const preventSpy = spyOn(event, 'preventDefault');
    inputEl.dispatchEvent(event);
    expect(preventSpy).toHaveBeenCalled();
  });

  it('should remove non-numeric characters on input', () => {
    inputEl.value = 'a1b2c3';
    const event = new Event('input');
    inputEl.dispatchEvent(event);
    expect(inputEl.value).toBe('123');
  });
});
