import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNoNumbers]'
})
export class NoNumbersDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    const newValue = value.replace(/[0-9]/g, ''); // Remove numbers
    const capitalizedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);

    if (capitalizedValue !== value) {
      input.value = capitalizedValue;
      event.stopPropagation(); // Prevent further propagation of the event
    }
  }
}