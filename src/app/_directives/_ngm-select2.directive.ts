import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'select[ngm-select2]'
})
export class NgmSelect2Directive implements OnInit {
  @Input('ngm-select2') options: any = {};

  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    (<any>$(this.el.nativeElement)).select2(this.options);
    if (!this.options.search?.enabled) {
      $(this.el.nativeElement).find('.select2-search__field')?.prop('disabled', true);
    }
  }
}

