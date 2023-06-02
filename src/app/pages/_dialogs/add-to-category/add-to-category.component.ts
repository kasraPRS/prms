import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCategoryHttpService } from 'src/app/_requests/userCategory/userCategory.service';
import { environment } from 'src/environments/environment';

import { ToastrService } from 'src/app/_services/toastr.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { UserCategory_GetAllDTO, UserCategory_GetUserCategoriesByUserCountDTO } from 'src/app/_requests/userCategory/userCategoryModel';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';

@Component({
  selector: 'prms-add-to-category',
  templateUrl: './add-to-category.component.html',
  styleUrls: ['./add-to-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    UserCategoryHttpService,
  ]
})
export class AddToCategoryDialogComponent implements OnInit {
  environment = environment;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserCategories: UserCategory_GetUserCategoriesByUserCountDTO[] = [];
  categories: PaginationModel<UserCategory_GetAllDTO[]> = new PaginationModel<UserCategory_GetAllDTO[]>();
  selectedCategories: number[] = [];
  complete = {
    removeCategories: false,
    addCategories: false,
  };

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private userCategoryHttpService: UserCategoryHttpService,
    private dialogRef: MatDialogRef<AddToCategoryDialogComponent>,
  ) { }
  ngOnInit(): void { this.init(); }

  // Initialize
  init() {
    this.getCategories();
    this.getCurrentUserCategories();
  }
  t(e: any) {
    console.log(e)
  }
  // Get Methods 
  getCategories() {
    this.userCategoryHttpService.GetAll().subscribe(
      response => {
        this.categories = response;
        this.selectCurrentUserCategories();
      }
    );
  }
  getCurrentUserCategories() {
    this.userCategoryHttpService.GetUserCategoriesByUserCount({ userId: this.data.userId }).subscribe(
      response => {
        this.currentUserCategories = response;
        this.selectCurrentUserCategories();
      }
    );
  }

  // Handeler Methods
  selectCurrentUserCategories() {
    if (this.currentUserCategories?.length) {
      this.selectedCategories = this.currentUserCategories.map(c => c.id);
    }
  }

  // Event Methods
  onClickCategory(categoryId: number) {
    // this.dialog.open(CategoryMarketersComponent, {
    //   data: { catId: categoryId }
    // });
    // this.dialogRef.close();
  }

  // Send Data 
  done() {
    // Before Send Init Handelers
    this.isLoading$.next(true);
    this.complete.addCategories = false;
    this.complete.removeCategories = false;
    this.cdr.detectChanges();
    // Find Categories For Add To User Categories List
    let addCategories = this.selectedCategories.filter(
      cId => this.currentUserCategories.findIndex(category => category.id === cId) === -1
    );
    if (addCategories.length) {
      this.addUserToCategories(addCategories);
    }
    else {
      this.complete.addCategories = true;
      this.completeEdit();
    }
    // Find Categories For Remove From User Categories List
    let removeCategories = this.currentUserCategories.filter(
      category => this.selectedCategories.findIndex(cId => category.id === cId) === -1
    ).map(c => c.id);
    if (removeCategories.length) {
      this.removeUserFromCategories(removeCategories);
    }
    else {
      this.complete.removeCategories = true;
      this.completeEdit();
    }
  }
  addUserToCategories(categoryIds: number[]) {
    this.userCategoryHttpService.AddMultiCategoryToUser({
      userId: this.data.userId,
      categoryIds: categoryIds,
    }).pipe(finalize(() => {
      this.complete.addCategories = true;
      this.completeEdit();
    })).subscribe()
  }
  removeUserFromCategories(categoryIds: number[]) {
    this.userCategoryHttpService.RemoveMultiCategoryToUser({
      userId: this.data.userId,
      categoryIds: categoryIds,
    }).pipe(finalize(() => {
      this.complete.removeCategories = true;
      this.completeEdit();
    })).subscribe()
  }

  // Other Methods
  close() { this.dialogRef.close(); }
  completeEdit() {
    if (this.complete.addCategories && this.complete.removeCategories) {
      this.init();
      this.isLoading$.next(false);
      setTimeout(() => this.cdr.detectChanges(), 500);
    }
  }
}
