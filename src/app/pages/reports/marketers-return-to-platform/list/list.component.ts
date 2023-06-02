import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDTO } from 'src/app/_models/Users/UsersDTO';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';


@Component({
  selector: 'prms-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }

  generateRandom(min = 0, max = 100) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;

  } //this method will be removed

}
