import { NoPasteDirective } from './no-paste-directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  standalone: true,
  imports: [NoPasteDirective],
  template: `<input appNoPaste />`,
})
class TestComponent {}

describe('NoPasteDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent], // ✅ import instead of declare
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should create an instance', () => {
    const directive = new NoPasteDirective();
    expect(directive).toBeTruthy();
  });

  it('should prevent paste event', () => {
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    });

    const preventDefaultSpy = spyOn(
      pasteEvent,
      'preventDefault'
    ).and.callThrough();

    inputElement.dispatchEvent(pasteEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
