import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_getAllUsersDTO } from 'src/app/_requests/user/userModel';
import { UserCategoryHttpService } from 'src/app/_requests/userCategory/userCategory.service';
import { UserCategory_GetAllDTO } from 'src/app/_requests/userCategory/userCategoryModel';

@Component({
  selector: 'prms-marketers-list',
  templateUrl: './marketers-list.component.html',
})
export class MarketersListComponent implements OnInit {

  tableDataSource: PaginationModel<User_getAllUsersDTO[]> = new PaginationModel<User_getAllUsersDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
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
    private UserHttpService: UserHttpService,
    private userCategoryHttpService: UserCategoryHttpService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.getMarketersList();
    this.getUserCategoryLists();
  }
  getMarketersList() {
    this.tableDataSource.items = [];
    this.UserHttpService.getAllUsers({
      Email: this.tableFilterOptions.email,
      Name: this.tableFilterOptions.name,
      Gender: this.tableFilterOptions.gender,
      IncludeAdmin: false,
      PageNumber: this.tableDataSource.pageNumber,
      PageSize: 10,
      RoleName: this.tableFilterOptions.roleName.join(','),
      UserCategoryIds: this.tableFilterOptions.userCategoryName.join(','),
      UserName: this.tableFilterOptions.userName
    }).subscribe(res => {

      this.tableDataSource = res;
      this.cdr.detectChanges();

    });
  }
  getUserCategoryLists() {
    this.userCategoryHttpService.GetAll().subscribe(res => {
      this.userCategoriesList = res;
      this.cdr.detectChanges();
    });
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
    this.getMarketersList();
  }
  onBtnApplyFilterClick() {
    this.getMarketersList();
  }
  generateRandom(min = 0, max = 100) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;

  } //this method will be removed

}
