import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prms-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss']
})
export class ToolTipComponent implements OnInit {

  @Input() context: string = '';
  @Input() containerIsNotBody: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
