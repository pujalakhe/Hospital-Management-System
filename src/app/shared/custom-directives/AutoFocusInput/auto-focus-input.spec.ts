import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusInput } from './auto-focus-input';

@Component({
  template: `
    <div appAutoFocusInput>
      <input type="text" />
    </div>
  `,
  standalone: true,
  imports: [AutoFocusInput],
})
class TestHostComponent {}

describe('AutoFocusInput Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create an instance of the directive', () => {
    const directiveEl: DebugElement = fixture.debugElement.query(
      By.directive(AutoFocusInput)
    );
    expect(directiveEl).not.toBeNull();
  });

  it('should focus the first input element after view init', (done) => {
    // Wait for setTimeout in directive
    setTimeout(() => {
      expect(document.activeElement).toBe(inputEl);
      done();
    }, 10);
  });
});
