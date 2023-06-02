import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DefaultCommissionHttpService } from 'src/app/_requests/defaultCommission/defaultCommission.service';
import { DefaultCommission_getDTO } from 'src/app/_requests/defaultCommission/defaultCommissionModel';
import { ToastrService } from 'src/app/_services/toastr.service';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'prms-default-commissions-for-all-rms',
  templateUrl: './default-commissions-for-all-rms.component.html',
})
export class DefaultCommissionsForAllRmsComponent implements OnInit {

  changingStatus: boolean;

  defaultCommisions: DefaultCommission_getDTO = {
    dmCommission: 0,
    level3Commission: 0,
    level4Commission: 0,
    level5Commission: 0,
    rmCommission: 0,
  };

  form: FormGroup = new FormGroup({
    RM: new FormControl(0),
    DM: new FormControl(0),
    L3: new FormControl(0),
    L4: new FormControl(0),
    L5: new FormControl(0),
  });

  constructor(
    private defaultCommissionHttpService: DefaultCommissionHttpService,
    private administrationService: AdministrationService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setDefaultDataToForm();
    this.getDefaultCommisions();
  }

  onBtnChangeClick() {
    this.changingStatus = true;
  }
  onBtnApplyClick() {
    const FORM = this.form.value;
    const TOTAL: number = FORM.DM + FORM.RM + FORM.L3 + FORM.L4 + FORM.L5;
    if (
      FORM.RM == this.defaultCommisions.rmCommission &&
      FORM.DM == this.defaultCommisions.dmCommission &&
      FORM.L3 == this.defaultCommisions.level3Commission &&
      FORM.L4 == this.defaultCommisions.level4Commission &&
      FORM.L5 == this.defaultCommisions.level5Commission
    ) this.changingStatus = false;
    else if (TOTAL <= 50) this.onSubmit();
    else this.toastr.error('The Total Share can not be more than 50%');
  }
  getDefaultCommisions() {

    this.defaultCommissionHttpService.get().subscribe(
      res => {
        this.defaultCommisions = res;
        this.setDefaultDataToForm();
        this.cdr.detectChanges();
      }
    );

  }
  setDefaultDataToForm() {
    this.form.patchValue({
      RM: this.defaultCommisions.rmCommission,
      DM: this.defaultCommisions.dmCommission,
      L3: this.defaultCommisions.level3Commission,
      L4: this.defaultCommisions.level4Commission,
      L5: this.defaultCommisions.level5Commission,
    });
    this.cdr.detectChanges();
  }
  setFormDataToDefaultData() {
    const FORM = this.form.value;
    this.defaultCommisions.dmCommission = FORM.DM;
    this.defaultCommisions.rmCommission = FORM.RM;
    this.defaultCommisions.level3Commission = FORM.L3;
    this.defaultCommisions.level4Commission = FORM.L4;
    this.defaultCommisions.level5Commission = FORM.L5;
    this.cdr.detectChanges();
  }

  onSubmit() {
    const FORM = this.form.value;
    const BODY = {
      dmCommission: FORM.DM,
      level3Commission: FORM.L3,
      level4Commission: FORM.L4,
      level5Commission: FORM.L5,
      rmCommission: FORM.RM,
      totalShareCommission:''
    }
    this.changingStatus = false;
    this.defaultCommissionHttpService.put(BODY).subscribe({
      next: () => {
        this.setFormDataToDefaultData();
        BODY.totalShareCommission = FORM.DM + FORM.RM + FORM.L3 + FORM.L4 + FORM.L5;
        this.administrationService.defaultCommisionsChange$.next(BODY);
      },
      error: err => {
        this.setDefaultDataToForm();
      }
    });
  }

}
