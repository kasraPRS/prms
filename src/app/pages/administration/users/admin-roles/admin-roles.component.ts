import { Component, OnInit } from '@angular/core';
import { AdministrationTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-admin-roles',
  templateUrl: './admin-roles.component.html',
})
export class AdminRolesComponent implements OnInit {

  tooltips = AdministrationTooltips.users.adminRoles;

  constructor() { }

  ngOnInit(): void {
  }

}
