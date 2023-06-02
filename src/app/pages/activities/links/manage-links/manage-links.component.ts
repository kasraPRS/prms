import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LinkInformationComponent } from '../../_dialogs/link-information/link-information.component';
import { NewLinkComponent } from '../../_dialogs/new-link/new-link.component';
import { LinkHttpService } from '../../../../_requests/link/link.service';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import Swal from 'sweetalert2';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  Link_getAllPaginationDTO,
  Link_GetMediumListDto,
  Link_GetSourceListDto,
} from 'src/app/_requests/link/linkModel';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'prms-manage-links',
  templateUrl: './manage-links.component.html',
})
export class ManageLinksComponent implements OnInit, AfterViewInit {

  baseLinkUrl: string = environment.baseLinkUrl;
  tooltips = ActivitiesTooltips;
  tableDataSource: PaginationModel<Link_getAllPaginationDTO[]> = new PaginationModel<Link_getAllPaginationDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  totalCount: number = 0
  sourceDto: Link_GetSourceListDto[] = [];
  mediumDto: Link_GetMediumListDto[] = [];
  tableFilterOptions: { name: string, source: string, medium: string } = {
    name: '',
    source: '',
    medium: ''
  };

  constructor(
    private dialog: MatDialog,
    private LinkHttpService: LinkHttpService,
    private cdr: ChangeDetectorRef,
    private clipboard: Clipboard
  ) {

  }

  ngOnInit(): void {
    this.onGetListPagination();
    this.onGetSourceList();
    this.onGetMediumList();
  }

  ngAfterViewInit(): void {
  }

  onBtnCreateNewLinkClick() {
    this.dialog.open(NewLinkComponent, {
      data: {
        id: 0,
        name: '',
        url: '',
        linkCampaignId: 0,
        title: 'New',
        source: '',
        medium: '',
      }
    }).afterClosed().subscribe(result => {
      this.onGetListPagination()
    });
  }

  onTableRowClick(data: any) {
    this.LinkHttpService.getLink({ Id: data.id }).subscribe(res => {
      this.dialog.open(LinkInformationComponent, {
        data: {
          id: res.id,
          name: res.name,
          url: res.url,
          encriptedInfo: res.encriptedInfo,
          linkCampaignId: res.linkCampaignId,
          title: 'Update',
          createdBy: data.createdBy,
          source: data.source,
          medium: data.medium,
        }
      }).afterClosed().subscribe(result => {
        this.onGetListPagination()
      });
    })
  }

  onBtnUpdateExistLinkClick(_id: number) {
    this.LinkHttpService.getLink({ Id: _id }).subscribe(res => {
      this.dialog.open(NewLinkComponent, {
        data: {
          id: res.id,
          name: res.name,
          url: res.url,
          linkCampaignId: res.linkCampaignId,
          title: 'Update',
          source: res.source,
          medium: res.medium,
        }
      }).afterClosed().subscribe(result => {
        this.onGetListPagination()
      });
    })
  }

  onBtnDeleteLinkClick(_data: any) {
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
          this.LinkHttpService.delete({ Id: _data.id }).subscribe(result => {
            this.onGetListPagination()
          })
        }
      });
  }

  onBtnCopyUrlClick(_item: any) {
    this.clipboard.copy(this.baseLinkUrl + '/' + _item.url);
  }

  onGetListPagination() {
    this.tableDataSource.items = [];
    this.LinkHttpService
      .getAllPagination({
        "Params.PageNumber": this.tableDataSource.pageNumber,
        "Params.PageSize": 10,
        Name: this.tableFilterOptions.name,
        UserId: CurrentUser.userId,
        Source: this.tableFilterOptions.source,
        Medium: this.tableFilterOptions.medium
      })
      .subscribe(res => {
        this.tableDataSource = res;
        this.cdr.detectChanges();
      });
  }

  private onGetSourceList() {
    this.LinkHttpService.getSourceList({ Source: this.tableFilterOptions.source, UserId: CurrentUser.userId })
      .subscribe(res => {
        this.sourceDto = []
        this.sourceDto = res;
        this.cdr.detectChanges();
      });
  }

  private onGetMediumList() {
    this.LinkHttpService.getMediumList({ Medium: this.tableFilterOptions.medium, UserId: CurrentUser.userId })
      .subscribe(res => {
        this.mediumDto = []
        this.mediumDto = res;
        this.cdr.detectChanges();
      });
  }

  onBtnApplyFilterClick() {
    this.onGetListPagination();
  }

  onBtnResetFilterClick() {
    this.tableFilterOptions = {
      name: '',
      source: '',
      medium: ''
    };
    this.onGetListPagination();
  }

}
