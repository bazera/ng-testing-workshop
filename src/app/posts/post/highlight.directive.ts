import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() color = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseover')
  on() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('mouseleave')
  off() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
