import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_getAllUsersIdAndNameDTO } from 'src/app/_requests/user/userModel';
import { UserCategoryHttpService } from 'src/app/_requests/userCategory/userCategory.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { MarketersCategoriesComponent } from '../marketers-categories/marketers-categories.component';

@Component({
  selector: 'prms-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewCategoryComponent implements OnInit {

  marketersList: User_getAllUsersIdAndNameDTO[] = [];
  selectedMarketers: number[] = [];
  categoryName: string;
  submitSpnStatus: boolean;

  constructor(
    private userHttpService: UserHttpService,
    private userCategoryHttpService: UserCategoryHttpService,
    private cdr: ChangeDetectorRef,
    public ref: MatDialogRef<NewCategoryComponent>,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  getMarketersList(searchText?: string) {
    this.marketersList = [];
    this.userHttpService.getAllUsersIdAndName({ UserName: searchText || '' }).subscribe(res => {
      this.marketersList = res.items;
      this.cdr.detectChanges();
    });
  }
  ngOnInit(): void {
  }
  onSlctAddMarketerSearch(event: any) {
    if (event?.term) {
      this.getMarketersList(event?.term);
    }
    else this.marketersList = [];
  }
  onBtnDoneClick() {
    this.submitSpnStatus = true;
    this.cdr.detectChanges();
    this.createNewCategory();
  }
  onChangeMarketersSelect() {
    this.marketersList = [];
    this.cdr.detectChanges();
  }
  createNewCategory() {
    this.userCategoryHttpService.AddCategoryAndAddUser({ name: this.categoryName, userIds: this.selectedMarketers }).subscribe({
      next: res => {
        this.dialog.open(MarketersCategoriesComponent);
        this.ref.close();
      },
      error: err => {
        this.submitSpnStatus = false;
        this.cdr.detectChanges();
      }
    });
  }

}
