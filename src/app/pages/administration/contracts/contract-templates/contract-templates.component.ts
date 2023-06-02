import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { NewContractTemplateComponent } from '../../_dialogs/new-contract-template/new-contract-template.component';
import { ContractTemplateHttpService } from '../../../../_requests/contractTemplate/contractTemplate.service'
import Swal from 'sweetalert2'
import { ContractTemplate_getListPaginationDTO } from 'src/app/_requests/contractTemplate/contractTemplateModel';
import { AdministrationTooltips } from 'src/app/_tooltip/tooltips';
@Component({
  selector: 'prms-contract-templates',
  templateUrl: './contract-templates.component.html',
})
export class ContractTemplatesComponent implements OnInit {

  tooltips = AdministrationTooltips.contracts.contractTemplates;
  tableDataSource: PaginationModel<ContractTemplate_getListPaginationDTO[]> = new PaginationModel<ContractTemplate_getListPaginationDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ContractTemplateHttpService: ContractTemplateHttpService
  ) { }

  ngOnInit(): void {
    this.onGetListPagination()
  }

  onBtnCreateNewContractClick() {
    this.dialog.open(NewContractTemplateComponent, {
      data: {
        id: 0,
        name: '',
        content: '',
        title: "new"
      }
    }).afterClosed().subscribe(result => {
      this.onGetListPagination()
    });
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
          this.ContractTemplateHttpService.delete({ id: _data.id }).subscribe(result => {
            this.onGetListPagination()
          })
        }
      });
  }

  onBtnEditClick(_id: number) {
    this.ContractTemplateHttpService.get({ id: _id }).subscribe(res => {
      this.dialog.open(NewContractTemplateComponent, {
        data: {
          id: res.id,
          name: res.name,
          content: res.content,
          title: 'update'
        }
      }).afterClosed().subscribe(result => {
        this.onGetListPagination()
      });
    })
  }

  onBtnViewClick() {

  }

  onGetListPagination() {
    this.tableDataSource.items = [];
    this.ContractTemplateHttpService.
      getListPagination({ PageNumber: this.tableDataSource.pageNumber, PageSize: 5 })
      .subscribe(res => {
        this.tableDataSource = res;
        this.cdr.detectChanges();
      });
  }

}
