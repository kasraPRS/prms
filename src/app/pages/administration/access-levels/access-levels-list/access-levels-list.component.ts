import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prms-access-levels-list',
  templateUrl: './access-levels-list.component.html',
})
export class AccessLevelsListComponent implements OnInit {

  list: { feature: string, rm: boolean, dm: boolean, level3: boolean, level4: boolean, level5: boolean }[] = [
    {
      feature: 'Marketer Sign Up Link Creation',
      rm: true,
      dm: true,
      level3: true,
      level4: true,
      level5: false
    },
    {
      feature: 'Marketer Sign Up Link Creation',
      rm: true,
      dm: true,
      level3: true,
      level4: true,
      level5: false
    },
    {
      feature: 'Marketer Sign Up Link Creation',
      rm: true,
      dm: true,
      level3: true,
      level4: true,
      level5: false
    },
    {
      feature: 'Marketer Sign Up Link Creation',
      rm: true,
      dm: true,
      level3: true,
      level4: true,
      level5: false
    },
    {
      feature: 'Marketer Sign Up Link Creation',
      rm: true,
      dm: true,
      level3: true,
      level4: true,
      level5: false
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
