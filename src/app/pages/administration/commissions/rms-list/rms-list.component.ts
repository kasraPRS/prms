import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth';
import { GetAdminChildrenDTO } from 'src/app/_models/Team/GetAdminChildrenDTO';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { customCommissionHttpService } from 'src/app/_requests/customCommission/customCommission.service';
import { TeamHttpService } from 'src/app/_requests/team/team.service';
import { Team_getAdminChildrenDTO } from 'src/app/_requests/team/teamModel';
import { UserCategoryHttpService } from 'src/app/_requests/userCategory/userCategory.service';
import { UserCategory_GetAllDTO } from 'src/app/_requests/userCategory/userCategoryModel';
import { ToastrService } from 'src/app/_services/toastr.service';
import { AdministrationService } from '../../administration.service';
import { AdministrationTooltips } from 'src/app/_tooltip/tooltips';
import Swal from 'sweetalert2';

interface IUSER {
  defaultData: Team_getAdminChildrenDTO,
  rmCommission: number,
  dmCommission: number,
  level3Commission: number;
  level4Commission: number;
  level5Commission: number;
  editMood: boolean;
}
@Component({
  selector: 'prms-RMs-list',
  templateUrl: './rms-list.component.html',
})
export class RmsListComponent implements OnInit {
  tooltips = AdministrationTooltips.commissions.branches;

  tableDataSource: PaginationModel<IUSER[]> = new PaginationModel<IUSER[]>();
  tableFilterOptions: { userName: string, roleName: string[], userCategoryName: string[], gender: 'male' | 'femail' | null, name: string, email: string } = {
    userName: '',
    roleName: [],
    userCategoryName: [],
    name: '',
    email: '',
    gender: null
  }
  userCategoriesList: PaginationModel<UserCategory_GetAllDTO[]> = new PaginationModel<UserCategory_GetAllDTO[]>();

  constructor(
    private teamHttpService: TeamHttpService,
    private customCommissionHttpService: customCommissionHttpService,
    private AdministrationService: AdministrationService,
    private toastr: ToastrService,
    private userCategoryHttpService: UserCategoryHttpService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getData();
    this.defaultCommisionsChange();
    this.getUserCategoryLists();
  }
  getData() {
    this.tableDataSource.items = [];
    this.teamHttpService.GetAdminChildren({
      Email: this.tableFilterOptions.email!,
      Name: this.tableFilterOptions.name!,
      Gender: this.tableFilterOptions.gender!,
      PageNumber: this.tableDataSource.pageNumber!,
      PageSize: 10,
      RoleName: this.tableFilterOptions.roleName.join(',')!,
      UserCategoryIds: this.tableFilterOptions.userCategoryName.join(',')!,
      UserName: this.tableFilterOptions.userName!
    }).subscribe(res => {
      this.tableDataSource = new PaginationModel<IUSER[]>({
        items: res.items.map(rm => this.createNewUserItem(rm)),
        hasNextPage: res.hasNextPage,
        hasPreviousPage: res.hasPreviousPage,
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
        totalCount: res.totalCount,
        totalPages: res.totalPages
      })
      this.cdr.detectChanges();
    });
  }
  createNewUserItem(user: Team_getAdminChildrenDTO): IUSER {

    return {
      defaultData: user,
      dmCommission: user.dmCommission,
      rmCommission: user.rmCommission,
      level3Commission: user.level3Commission,
      level4Commission: user.level4Commission,
      level5Commission: user.level5Commission,
      editMood: false
    }

  }
  onBtnResetFilterClick() {
    this.tableFilterOptions = {
      userName: '',
      roleName: [],
      userCategoryName: [],
      name: '',
      email: '',
      gender: null
    };
    this.getData();
  }
  onBtnApplyFilterClick() {
    this.getData();
  }
  getUserCategoryLists() {
    this.userCategoryHttpService.GetAll().subscribe(res => {
      this.userCategoriesList = res;
      this.cdr.detectChanges();
    });
  }
  onBtnEditClick(user: IUSER) {
    user.editMood = true;
    this.cdr.detectChanges();
  }
  resetToDefault(user: IUSER) {
    Swal.fire(
      {
        title: 'Are you sure you want to reset custom commission of this user?',
        html: `${user.defaultData.firstName} ${user.defaultData.lastName}`,
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {

          this.customCommissionHttpService.DeleteByAdmin({ userId: user.defaultData.id }).subscribe(
            res => {
              this.getData();
            }
          );

        }
      });
  }
  onBtnSubmitRowCommissionsClick(user: IUSER) {

    const TOTAL = this.getTotalShare(user);
    if (TOTAL > 50) this.toastr.error('The Total Share can not be more than 50%');
    else {

      user.editMood = false;
      this.cdr.detectChanges();

      if (user.defaultData.hasCustomCommission) {
        this.editCustomCommission(user).subscribe();
      }
      else {
        user.defaultData.hasCustomCommission = true;
        this.createCustomCommission(user).subscribe();
      }

    }

  }
  getTotalShare(user: IUSER): number {
    let total: number = 0;
    for (let key in user) {
      if (key == 'rmCommission' || key == 'dmCommission' || key == 'level3Commission' || key == 'level4Commission' || key == 'level5Commission') {
        let num = Number(user[key] || 0);
        total += (isNaN(num) ? 0 : num);
      }
    }
    return total;
  }
  checkUserNewDataWithDefaultData(user: IUSER): boolean {
    if (
      user.rmCommission != user.defaultData.rmCommission ||
      user.dmCommission != user.defaultData.dmCommission ||
      user.level3Commission != user.defaultData.level3Commission ||
      user.level4Commission != user.defaultData.level4Commission ||
      user.level5Commission != user.defaultData.level5Commission
    ) return true
    else return false
  }
  editCustomCommission(user: IUSER): Observable<any> {
    return new Observable<any>(observer => {

      if (this.checkUserNewDataWithDefaultData(user)) {

        const BODY = {
          "rmUserId": user.defaultData.id,
          "rmCommission": user.rmCommission,
          "dmCommission": user.dmCommission,
          "level3Commission": user.level3Commission,
          "level4Commission": user.level4Commission,
          "level5Commission": user.level5Commission
        };

        this.customCommissionHttpService.put(BODY).subscribe({
          next: () => {
            this.setUserFormDataToDefaultData(user);
            observer.next();
          },
          error: err => {
            this.setUserDefaultDataToFormData(user);
            observer.error(err);
          }
        });

      }
      else observer.next();

    });

  }
  createCustomCommission(user: IUSER): Observable<any> {
    return new Observable<any>(observer => {

      const BODY = {
        "rmId": user.defaultData.id,
        "rmCommission": user.rmCommission,
        "dmCommission": user.dmCommission,
        "level3Commission": user.level3Commission,
        "level4Commission": user.level4Commission,
        "level5Commission": user.level5Commission
      };

      this.customCommissionHttpService.post(BODY).subscribe({
        next: () => {
          this.setUserFormDataToDefaultData(user);
          observer.next();
        },
        error: err => {
          user.defaultData.hasCustomCommission = false;
          this.setUserDefaultDataToFormData(user);
          observer.error(err);
        }
      });

    });
  }
  setUserDefaultDataToFormData(user: IUSER) {
    user.rmCommission = user.defaultData.rmCommission;
    user.dmCommission = user.defaultData.dmCommission;
    user.level3Commission = user.defaultData.level3Commission;
    user.level4Commission = user.defaultData.level4Commission;
    user.level5Commission = user.defaultData.level5Commission;
    this.cdr.detectChanges();
  }
  setUserFormDataToDefaultData(user: IUSER) {
    user.defaultData.rmCommission = user.rmCommission;
    user.defaultData.dmCommission = user.dmCommission;
    user.defaultData.level3Commission = user.level3Commission;
    user.defaultData.level4Commission = user.level4Commission;
    user.defaultData.level5Commission = user.level5Commission;
    this.cdr.detectChanges();
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

}
