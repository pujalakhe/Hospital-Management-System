import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocusInput]',
  standalone: true,
})
export class AutoFocusInput {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const firstControl: HTMLElement | null =
      this.el.nativeElement.querySelector('input, select, textarea');

    if (firstControl) {
      setTimeout(() => firstControl.focus(), 0);
    }
  }
}
