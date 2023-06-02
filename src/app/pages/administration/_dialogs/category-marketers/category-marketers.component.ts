import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_getAllUsersIdAndNameDTO } from 'src/app/_requests/user/userModel';
import { UserCategoryHttpService } from 'src/app/_requests/userCategory/userCategory.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import Swal from 'sweetalert2';
import { AddMerketersToCategoryComponent } from '../add-merketers-to-category/add-merketers-to-category.component';
import { MarketersCategoriesComponent } from '../marketers-categories/marketers-categories.component';

@Component({
  selector: 'prms-category-marketers',
  templateUrl: './category-marketers.component.html',
})
export class CategoryMarketersComponent implements OnInit {

  categoryId: string;
  usersList: User_getAllUsersIdAndNameDTO[] = [];

  constructor(
    private userHttpService: UserHttpService,
    private userCategoryHttpService: UserCategoryHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    public ref: MatDialogRef<CategoryMarketersComponent>,
    private dialog: MatDialog
  ) {
    this.categoryId = data.catId;
  }

  ngOnInit(): void {
    this.getCategoryUsers();
  }
  getCategoryUsers() {
    this.userHttpService.getAllUsersIdAndName({ UserCategoryIds: this.categoryId }).subscribe(res => {
      this.usersList = res.items;
    });
  }
  onDeleteBtnClick(user: User_getAllUsersIdAndNameDTO) {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      html: user.fullName,
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.deleteUser(user);
      }
    });
  }
  deleteUser(user: User_getAllUsersIdAndNameDTO) {
    this.userCategoryHttpService.DeleteUserFromUserCategory({ userCategoryId: Number(this.categoryId), userId: user.id }).subscribe(
      res => {
        const INDEX = this.usersList.findIndex(u => u.id == user.id);
        this.usersList.splice(INDEX, 1);
        this.cdr.detectChanges();
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  onBtnDoneClick() {
    this.dialog.open(MarketersCategoriesComponent);
    this.ref.close();
  }
  onBtnAddMerketerClick() {
    this.dialog.open(AddMerketersToCategoryComponent, { data: { selectedUsersIds: this.usersList.map(i => i.id), catId: this.categoryId } });
    this.ref.close();
  }

}
