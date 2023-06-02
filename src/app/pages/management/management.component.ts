import { Component, OnInit } from '@angular/core';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';

@Component({
  selector: 'prms-management',
  templateUrl: './management.component.html',
})
export class ManagementComponent implements OnInit {
  
  tooltips = ManagementTooltips;
  user: UserModel;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.user = this.authService.currentUserValue!;
  }
}
