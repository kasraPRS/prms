import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCampaignComponent } from '../../_dialogs/new-campaign/new-campaign.component';
import { CampaignHttpService } from '../../../../_requests/linkCampaign/linkCampaign.service';
import { LinkHttpService } from '../../../../_requests/link/link.service';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LinkCampaign_getAllPaginationDTO } from 'src/app/_requests/linkCampaign/linkCampaignModel';
import {
  Link_GetMediumListDto,
  Link_GetSourceListDto,
} from 'src/app/_requests/link/linkModel';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
})
export class ManageCampaignsComponent implements OnInit, AfterViewInit {

  tooltips = ActivitiesTooltips;
  tableDataSource: PaginationModel<LinkCampaign_getAllPaginationDTO[]> = new PaginationModel<LinkCampaign_getAllPaginationDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  sourceDto: Link_GetSourceListDto[] = [];
  mediumDto: Link_GetMediumListDto[] = [];
  tableFilterOptions: { name: string, source: string, medium: string } = {
    name: '',
    source: '',
    medium: ''
  };

  constructor(
    private dialog: MatDialog,
    private CampaignHttpService: CampaignHttpService,
    private LinkHttpService: LinkHttpService,
    private cdr: ChangeDetectorRef,
    private Router: Router
  ) {

  }

  ngOnInit(): void {
    this.onGetListPagination();
    this.onGetSourceList();
    this.onGetMediumList();
  }

  ngAfterViewInit(): void {
  }

  onBtnCreateNewCampaignClick() {
    this.dialog.open(NewCampaignComponent, {
      data: {
        id: 0,
        name: '',
        linkId: [],
        title: "New"
      }
    }).afterClosed().subscribe(result => {
      this.onGetListPagination()
    });
  }

  onBtnUpdateExistCampaignClick(_id: number) {
    this.CampaignHttpService.get({ Id: _id }).subscribe(res => {
      this.dialog.open(NewCampaignComponent, {
        data: {
          id: res.id,
          name: res.name,
          linkId: res.linkId,
          title: 'Update'
        }
      }).afterClosed().subscribe(result => {
        this.onGetListPagination()
      });
    })
  }

  onBtnDeleteCampaignClick(_data: any) {
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
          this.CampaignHttpService.delete({ Id: _data.id }).subscribe(result => {
            this.onGetListPagination()
          })
        }
      });
  }

  onRouteClick(data: any) {
    this.CampaignHttpService.setStateLinkCampaignId(data.id);
    this.CampaignHttpService.setStateLinkCampaignName(data.name);
  }

  onGetListPagination() {
    this.tableDataSource.items = [];
    this.CampaignHttpService
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
