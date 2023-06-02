import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { AdministrationService } from 'src/app/pages/administration/administration.service';
import { GetAdminChildrenDTO } from 'src/app/_models/Team/GetAdminChildrenDTO';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { customCommissionHttpService } from 'src/app/_requests/customCommission/customCommission.service';
import { TeamHttpService } from 'src/app/_requests/team/team.service';
import { Team_GetDTO, Team_GetTeamMarketerPaggingQueryDTO } from 'src/app/_requests/team/teamModel';
import { ToastrService } from 'src/app/_services/toastr.service';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';
import Swal from 'sweetalert2';
import { ChooseNameForNewTeamComponent } from '../../_dialogs/choose-name-for-new-team/choose-name-for-new-team.component';

@Component({
  selector: 'prms-branchs',
  templateUrl: './branchs.component.html',
})
export class BranchsComponent implements OnInit {

  tooltips = ManagementTooltips.commissions.branches;
  tableDataSource: PaginationModel<Team_GetDTO[]> = new PaginationModel<Team_GetDTO[]>();
  @Input() hasCustomCommissions$: BehaviorSubject<boolean | null>;
  hasCustomCommissions: boolean;

  constructor(
    private teamHttpService: TeamHttpService,
    private customCommissionHttpService: customCommissionHttpService,
    private AdministrationService: AdministrationService,
    private toastr: ToastrService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHasCustomCommissions();
    this.getData();
    this.defaultCommisionsChange();
  }
  getHasCustomCommissions() {
    this.hasCustomCommissions$.subscribe(status => {
      if (typeof status == 'boolean') this.hasCustomCommissions = status;
      this.cdr.detectChanges();
    });
  }
  getData() {
    this.authService.currentUserSubject.subscribe(value => {
      if (value) {
        this.tableDataSource.items = [];
        this.teamHttpService.Get({ rmId: value.id, PageNumber: this.tableDataSource.pageNumber, PageSize: 10 })
          .subscribe(res => {
            this.tableDataSource = res;
            this.cdr.detectChanges();
          });
      }
    });
  }
  onBtnSubmitRowCommissionsClick(RM: GetAdminChildrenDTO) {
    RM.editMood = false;
    this.cdr.detectChanges();

    if (RM.hasCustomCommission) {
      this.editCustomCommission(RM).subscribe({
        next: () => { },
        error: err => {
          this.getData();
        }
      });
    }
    else {
      RM.hasCustomCommission = true;
      this.createCustomCommission(RM).subscribe({
        next: () => { },
        error: err => {
          this.getData();
        }
      });
    }


  }
  getTotalShare(RM: GetAdminChildrenDTO): number {
    return Number(RM.rmCommission) +
      Number(RM.dmCommission) +
      Number(RM.level3Commission) +
      Number(RM.level4Commission) +
      Number(RM.level5Commission)
  }
  editCustomCommission(RM: GetAdminChildrenDTO): Observable<any> {
    return new Observable<any>(observer => {

      const BODY = {
        "rmUserId": RM.id,
        "rmCommission": RM.rmCommission,
        "dmCommission": RM.dmCommission,
        "level3Commission": RM.level3Commission,
        "level4Commission": RM.level4Commission,
        "level5Commission": RM.level5Commission
      };

      this.customCommissionHttpService.put(BODY).subscribe({
        next: () => { observer.next(); },
        error: err => { observer.error(err); }
      });

    });
  }
  createCustomCommission(RM: GetAdminChildrenDTO): Observable<any> {
    return new Observable<any>(observer => {

      const BODY = {
        "rmId": RM.id,
        "rmCommission": RM.rmCommission,
        "dmCommission": RM.dmCommission,
        "level3Commission": RM.level3Commission,
        "level4Commission": RM.level4Commission,
        "level5Commission": RM.level5Commission
      };

      this.customCommissionHttpService.post(BODY).subscribe({
        next: () => { observer.next(); },
        error: err => { observer.error(err); }
      });

    });
  }
  defaultCommisionsChange() {
    this.AdministrationService.defaultCommisionsChange$.subscribe({
      next: newData => {
        if (newData) {
          this.getData();
        }
      }
    });
  }
  onBtnEditClick(team: Team_GetDTO) {

    if (team.teamId) {
      this.router.navigate(['./create-team/' + team.teamId], { relativeTo: this.activatedRoute });
    }
    else {
      const DATA = {
        dmCommission: team.dmCommission,
        rmCommission: team.rmCommission,
        level3Commission: team.level3Commission,
        level4Commission: team.level4Commission,
        level5Commission: team.level5Commission,
        headUserId: team.headUserId
      };
      this.dialog.open(ChooseNameForNewTeamComponent, { disableClose: true, data: DATA });
    }

  }
  resetToDefault(team: Team_GetDTO) {
    Swal.fire(
      {
        title: 'Are you sure you want to reset custom commission of this team?',
        html: team.teamName,
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {

          this.teamHttpService.DeleteTeaByRm({ headUserId: team.headUserId }).subscribe(
            res => {
              this.getData();
            }
          );

        }
      });
  }

}
