import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoPaste]',
})
export class NoPasteDirective {
  @HostListener('paste', ['$event'])
  blockPaste(event: ClipboardEvent) {
    event.preventDefault();
  }
}
