import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})
export class AutosizeDirective implements OnInit {
  @Input() rowHeight: number = 30;
  @Input() minRow: number = 1;
  @Input() maxRow: number = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    if (this.minRow > this.maxRow) throw new Error('min row can not bigger max row');
    this.setRows(this.minRow);
  }

  // find enter count in string
  findEnterCNT = (content: any): number => [...content.matchAll('\n')].length;

  // calculate hight
  calculateHeight() {
    const enterCNT = this.findEnterCNT(this.el.nativeElement.value);
    const rows = this.setHeight(enterCNT);
    this.overflow(this.maxRow - 1 < rows);
  }
  setHeight(enterCNT: number): number {
    const rows = this.getRows(enterCNT);
    this.setRows(rows);

    const el = this.el.nativeElement;
    if (
      el?.scrollHeight > el?.clientHeight + 5 &&
      this.maxRow > rows
    ) enterCNT = this.setHeight(rows + 1);

    return enterCNT;
  }

  // return correct rows
  getRows(rows: number) {
    if (this.minRow > rows) return this.minRow;
    if (this.maxRow < rows) return this.maxRow;
    return rows;
  }

  // set rows
  setRows(rows: number) {
    this.renderer.setAttribute(this.el.nativeElement, 'rows', `${rows}`);
  }

  // overflow show / hide
  overflow(overfow: boolean) {
    if (overfow) this.renderer.setStyle(this.el.nativeElement, 'overflow', `auto`);
    else this.renderer.setStyle(this.el.nativeElement, 'overflow', `hidden`);
  }

  @HostListener('resize', ['$event']) onResize() { this.calculateHeight(); }
  @HostListener('input', ['$event']) onInput() { this.calculateHeight() }
}
