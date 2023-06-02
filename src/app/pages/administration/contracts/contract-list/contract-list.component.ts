import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { NewContractComponent } from '../../_dialogs/new-contract/new-contract.component';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2'
import { Contract_getListPaginationDTO } from 'src/app/_requests/contract/contractModel';
import { ContractHttpService } from 'src/app/_requests/contract/contract.service';

@Component({
  selector: 'prms-contract-list',
  templateUrl: './contract-list.component.html',
})
export class ContractListComponent implements OnInit {

  tableDataSource: PaginationModel<Contract_getListPaginationDTO[]> = new PaginationModel<Contract_getListPaginationDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  searchTerm: string = ''
  private modelChanged: Subject<string> = new Subject<string>();
  private subscription: Subscription;
  debounceTime = 500;

  constructor(
    private dialog: MatDialog,
    private ContractHttpService: ContractHttpService,
    private cdr: ChangeDetectorRef,
    private Router: Router
  ) {
    this.subscription = this.modelChanged
      .pipe(
        debounceTime(this.debounceTime),
      )
      .subscribe(() => {
        this.functionToBeCalled();
      });
  }

  ngOnInit(): void {
    this.onGetListPagination()
  }

  onBtnCreateNewContractClick() {
    this.dialog.open(NewContractComponent, {
      data: {
        id: 0,
        name: '',
        contractTemplateId: '0',
        title: "new",
        currentUser: CurrentUser.user.fullName
      }
    }).afterClosed()
      .subscribe(result => {
        this.onGetListPagination()
      });
  }

  onGetListPagination() {
    this.tableDataSource.items = [];
    this.ContractHttpService.
      getListPagination({
        "PageNumber": this.tableDataSource.pageNumber,
        "PageSize": 10,
        UserId: CurrentUser.userId,
        SearchTerm: this.searchTerm
      })
      .subscribe(res => {
        this.tableDataSource = res;
        this.cdr.detectChanges();
      });
  }

  onBtnViewClick(_item: any) {
    this.ContractHttpService.setStateContractId(_item.id)
    this.Router.navigate(['/activities/contracts/contract-information'])
  }

  inputChanged() {
    this.modelChanged.next("angular Is Awesome")
  }
  functionToBeCalled() {
    this.onGetListPagination()
  }

  onBtnDeleteClick(_data: any) {
    Swal.fire(
      {
        title: 'Are you sure you want to delete this item?',
        html: _data.name,
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {
          this.ContractHttpService.delete({ id: _data.id }).subscribe(result => {
            this.onGetListPagination()
          })
        }
      });
  }

  onBtnEditClick(_id: number) {
    this.ContractHttpService.get({ id: _id }).subscribe(res => {
      this.dialog.open(NewContractComponent, {
        data: {
          id: res.id,
          name: res.name,
          userId: res.userId,
          content: res.content,
          period: res.period,
          periodId: res.periodId,
          contractTemplateId: res.contractTemplateId,
          title: "update",
          currentUser: CurrentUser.user.fullName
        }
      }).afterClosed().subscribe(result => {
        this.onGetListPagination()
      });
    })
  }

}
