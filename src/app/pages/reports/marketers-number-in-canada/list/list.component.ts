import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
@Component({
  selector: 'prms-list',
  templateUrl: './list.component.html',
})
export class ListComponent {

  generateRandom(min = 0, max = 100) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;

  } //this method will be removed

}
