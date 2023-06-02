import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DefaultCommissionHttpService } from 'src/app/_requests/defaultCommission/defaultCommission.service';
import { DefaultCommission_getDTO } from 'src/app/_requests/defaultCommission/defaultCommissionModel';
import { AdministrationService } from './administration.service';
import { AdministrationTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-administration',
  templateUrl: './administration.component.html',
})
export class AdministrationComponent implements OnInit {

  tooltips = AdministrationTooltips;
  defaultCommisions: DefaultCommission_getDTO = {
    id: 0,
    dmCommission: 0,
    level3Commission: 0,
    level4Commission: 0,
    level5Commission: 0,
    rmCommission: 0,
    totalShareCommission: 0
  };

  constructor(
    private defaultCommissionHttpService: DefaultCommissionHttpService,
    private administrationService: AdministrationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getDefaultCommisions();
    this.defaultCommisionsChange();
  }
  getDefaultCommisions() {

    this.defaultCommissionHttpService.get().subscribe(
      res => {
        this.defaultCommisions = res;
        this.cdr.detectChanges();
      }
    );

  }
  defaultCommisionsChange() {
    this.administrationService.defaultCommisionsChange$.subscribe(res => {
      if (res) this.defaultCommisions = res;
      this.cdr.detectChanges();
    });
  }

}
