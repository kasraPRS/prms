import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card4',
  templateUrl: './card4.component.html',
})
export class Card4Component {
  @Input() privateTooltip: string;
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() private: boolean;
  @HostBinding('class') class = 'card h-100';
  @Output() deleteClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() editClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
