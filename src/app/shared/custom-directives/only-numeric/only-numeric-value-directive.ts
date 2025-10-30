import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumericValue]',
})
export class OnlyNumericValueDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const allowedPattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedPattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Optional: prevent pasting non-numeric values
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput = event.clipboardData?.getData('text') || '';
    if (!/^\d+$/.test(pastedInput)) {
      event.preventDefault();
    }
  }
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}
