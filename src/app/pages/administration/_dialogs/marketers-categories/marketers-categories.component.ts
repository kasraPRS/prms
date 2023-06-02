import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserCategoryHttpService } from 'src/app/_requests/userCategory/userCategory.service';
import { UserCategory_GetUserCategoriesByUserCountDTO } from 'src/app/_requests/userCategory/userCategoryModel';
import Swal from 'sweetalert2';
import { CategoryMarketersComponent } from '../category-marketers/category-marketers.component';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'prms-marketers-categories',
  templateUrl: './marketers-categories.component.html',
})
export class MarketersCategoriesComponent implements OnInit {

  categoriesList: UserCategory_GetUserCategoriesByUserCountDTO[] = [];

  constructor(
    private userCategoryHttpService: UserCategoryHttpService,
    private dialog: MatDialog,
    public ref: MatDialogRef<MarketersCategoriesComponent>
  ) { }

  ngOnInit(): void {
    this.getMarketersCategoriesList();
  }
  getMarketersCategoriesList() {

    this.userCategoryHttpService.GetUserCategoriesByUserCount().subscribe(res => {

      this.categoriesList = res;

    });

  }
  onBtnEditCategoryClick(category: UserCategory_GetUserCategoriesByUserCountDTO) {
    this.dialog.open(CategoryMarketersComponent, { data: { catId: category.id } });
    this.ref.close();
  }
  onBtnAddClick() {
    this.dialog.open(NewCategoryComponent);
    this.ref.close();
  }
  onBtnDeleteCategoryClick(category: UserCategory_GetUserCategoriesByUserCountDTO) {
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      html: category.name,
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.deleteCategory(category);
      }
    });
  }
  deleteCategory(category: UserCategory_GetUserCategoriesByUserCountDTO) {
    this.userCategoryHttpService.DeleteUserCategory({ id: category.id }).subscribe(
      res => {
        const INDEX = this.categoriesList.findIndex(i => i.id = category.id);
        this.categoriesList.splice(INDEX, 1);
      }
    );
  }

}
