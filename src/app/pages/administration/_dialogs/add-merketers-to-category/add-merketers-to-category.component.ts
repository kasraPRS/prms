import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_getAllUsersIdAndNameDTO } from 'src/app/_requests/user/userModel';
import { UserCategoryHttpService } from 'src/app/_requests/userCategory/userCategory.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { CategoryMarketersComponent } from '../category-marketers/category-marketers.component';

@Component({
  selector: 'prms-add-merketers-to-category',
  templateUrl: './add-merketers-to-category.component.html',
})
export class AddMerketersToCategoryComponent implements OnInit {

  submitSpnStatus: boolean;
  userCategoryId: number;
  usersList: User_getAllUsersIdAndNameDTO[] = [];
  selectedUsers: User_getAllUsersIdAndNameDTO[] = [];
  searchForUsers$: Subject<string> = new Subject<string>();
  lastSelectedUsersIds: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userHttpService: UserHttpService,
    private userCategoryHttpService: UserCategoryHttpService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public ref: MatDialogRef<AddMerketersToCategoryComponent>,
    private cdr: ChangeDetectorRef
  ) {
    this.lastSelectedUsersIds = data?.selectedUsersIds || [];
    this.userCategoryId = data?.catId;
  }

  ngOnInit(): void {
    this.searchForUsers();
  }
  onChangeSearchInput(value: string) {
    if (value) {
      this.searchForUsers$.next(value);
    }
    else {
      this.usersList = this.selectedUsers;
    }
  }
  searchForUsers() {
    this.searchForUsers$.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.userHttpService.getAllUsersIdAndName({ Name: value, IncludeAdmin: false }).subscribe(res => {

        this.usersList = res.items.filter(user => this.lastSelectedUsersIds.findIndex(id => user.id == id) == -1);

      });
    })
  }
  onCheckAndItem(user: User_getAllUsersIdAndNameDTO) {
    const INDEX = this.selectedUsers.findIndex(i => i.id == user.id);
    if (INDEX == -1)
      this.selectedUsers.push(user);
    else {
      this.selectedUsers.splice(INDEX, 1);
    }
  }
  checkIfItemChecked(user: User_getAllUsersIdAndNameDTO): boolean {
    return this.selectedUsers.findIndex(i => i.id == user.id) != -1
  }
  onDoneBtnClick() {
    if (this.selectedUsers.length) {
      this.submitSpnStatus = true;
      this.cdr.detectChanges();
      this.userCategoryHttpService.AddMultiUser({ userCategoryId: this.userCategoryId, userIds: this.selectedUsers.map(i => i.id) }).subscribe(
        res => {
          this.dialog.open(CategoryMarketersComponent, { data: { catId: this.userCategoryId } });
          this.ref.close();
        },
        err => {
          this.submitSpnStatus = false;
          this.cdr.detectChanges();
        }
      );
    }
    else {
      this.dialog.open(CategoryMarketersComponent, { data: { catId: this.userCategoryId } });
      this.ref.close();
    }
  }


}
