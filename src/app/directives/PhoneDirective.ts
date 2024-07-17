import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[phoneNumber]'
})
export class PhoneDirective {
  @Input() maxPhone: number;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    const transformedValue = initialValue.replace(/[^0-9]/g, '');
    if (transformedValue !== initialValue) {
      this.el.nativeElement.value = transformedValue;
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
    if (this.maxPhone && transformedValue.length > this.maxPhone) {
      this.el.nativeElement.value = transformedValue.slice(0, this.maxPhone);
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }
}