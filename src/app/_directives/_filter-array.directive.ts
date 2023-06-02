import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({ selector: '[filter]' })
export class FilterArrayDirective implements OnChanges {
  @Input() filter: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnChanges(): void { this.onFilter(); }
  private onFilter() {
    if (!this.el.nativeElement.text?.toLowerCase().include(this.filter.trim().toLowerCase()))
      this.renderer.setAttribute(this.el.nativeElement, 'hidden', 'true');
  }
}
