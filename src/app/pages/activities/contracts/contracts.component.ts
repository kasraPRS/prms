import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { ContractHttpService } from '../../../_requests/contract/contract.service'
import { NewContractComponent } from '../../administration/_dialogs/new-contract/new-contract.component';
import Swal from 'sweetalert2'
import { Contract_getListPaginationDTO } from 'src/app/_requests/contract/contractModel';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
})
export class ContractsComponent {

  tableDataSource: PaginationModel<Contract_getListPaginationDTO[]> = new PaginationModel<Contract_getListPaginationDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });

  constructor(
    private ContractHttpService: ContractHttpService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private Router: Router
  ) {

  }

  ngOnInit(): void {
    this.onGetListPagination()
  }

  ngAfterViewInit(): void {
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
    }).afterClosed().subscribe(result => {
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
        SearchTerm: ""
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
          content: res.content,
          userId: res.userId,
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
