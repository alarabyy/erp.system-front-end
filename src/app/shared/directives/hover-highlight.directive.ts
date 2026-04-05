import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true
})
export class HoverHighlightDirective {
  @Input() appHoverHighlight = 'var(--color-surface-alt)';

  constructor(private readonly element: ElementRef, private readonly renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.appHoverHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.element.nativeElement, 'background-color');
  }
}
