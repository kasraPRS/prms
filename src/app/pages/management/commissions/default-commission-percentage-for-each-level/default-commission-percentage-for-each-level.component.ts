import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { AdministrationService } from 'src/app/pages/administration/administration.service';
import { UsersDTO } from 'src/app/_models/Users/UsersDTO';
import { customCommissionHttpService } from 'src/app/_requests/customCommission/customCommission.service';
import { CustomCommission_GetCustomCommissionOfUserDTO } from 'src/app/_requests/customCommission/customCommissionModel';
import { DefaultCommissionHttpService } from 'src/app/_requests/defaultCommission/defaultCommission.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';

@Component({
  selector: 'prms-default-commission-percentage-for-each-level',
  templateUrl: './default-commission-percentage-for-each-level.component.html',
})
export class DefaultCommissionPercentageForEachLevelComponent implements OnInit {

  tooltips = ManagementTooltips.commissions.defaultCommissions;
  user: UsersDTO;
  changingStatus: boolean;
  hasCustomCommissions: boolean;
  @Input() hasCustomCommissions$: BehaviorSubject<boolean| null>;

  defaultCommisions: CustomCommission_GetCustomCommissionOfUserDTO = {
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
    private customCommissionHttpService: customCommissionHttpService,
    private administrationService: AdministrationService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setDefaultDataToForm();
    this.getDefaultCommisions();
    this.getCurrentUser();
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

    this.authService.currentUserSubject.subscribe(value => {
      if (value) {

        this.customCommissionHttpService.GetCustomCommissionOfUser({ userId: value.id }).subscribe(
          res => {
            this.defaultCommisions = res;
            this.hasCustomCommissions = res.hasCustomCommission!;
            this.hasCustomCommissions$.next(res.hasCustomCommission!);
            this.setDefaultDataToForm();
            this.cdr.detectChanges();
          }
        );

      }
    });

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
  getCurrentUser() {
    this.authService.currentUserSubject.subscribe(user => {
      if (user) {
        this.user = user;
        this.cdr.detectChanges();
      }
    });
  }
  onSubmit() {
    if (this.hasCustomCommissions) this.editCustomCommission();
    else this.createCustomCommission();
  }
  createCustomCommission() {
    const FORM = this.form.value;
    const BODY = {
      rmId: this.authService.currentUserSubject.value?.id!,
      dmCommission: FORM.DM,
      level3Commission: FORM.L3,
      level4Commission: FORM.L4,
      level5Commission: FORM.L5,
      rmCommission: FORM.RM
    }
    this.changingStatus = false;
    this.customCommissionHttpService.post(BODY).subscribe({
      next: () => {
        this.hasCustomCommissions = true;
        this.setFormDataToDefaultData();
      },
      error: err => {
        this.setDefaultDataToForm();
      }
    });
  }
  editCustomCommission() {
    const FORM = this.form.value;
    const BODY = {
      rmUserId: this.authService.currentUserSubject.value?.id!,
      dmCommission: FORM.DM,
      level3Commission: FORM.L3,
      level4Commission: FORM.L4,
      level5Commission: FORM.L5,
      rmCommission: FORM.RM
    }
    this.changingStatus = false;
    this.customCommissionHttpService.put(BODY).subscribe({
      next: () => {
        this.setFormDataToDefaultData();
      },
      error: err => {
        this.setDefaultDataToForm();
      }
    });
  }


}
