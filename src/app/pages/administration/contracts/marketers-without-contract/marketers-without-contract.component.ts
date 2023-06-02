import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContractComponent } from '../../_dialogs/new-contract/new-contract.component';

@Component({
  selector: 'prms-marketers-without-contract',
  templateUrl: './marketers-without-contract.component.html',
})
export class MarketersWithoutContractComponent implements OnInit {

  marketers: { title: string }[] = [
    { title: 'Jordan Scott' },
    { title: 'Jordan Scott' },
    { title: 'Jordan Scott' },
    { title: 'Jordan Scott' },
    { title: 'Jordan Scott' },
  ];

  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }
  onBtnCreateNewContractClick() { 
    this.dialog.open(NewContractComponent, { }).afterClosed().subscribe(result => {
      
    });
  }
}
