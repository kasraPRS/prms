import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'management-marketers-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  searchFocused: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  ngOnInit(): void {
  }

}
