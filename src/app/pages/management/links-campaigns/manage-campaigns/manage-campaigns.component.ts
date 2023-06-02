import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { NewCampaignComponent } from 'src/app/pages/activities/_dialogs/new-campaign/new-campaign.component';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import {
  Link_GetMediumListDto,
  Link_GetSourceListDto,
} from 'src/app/_requests/link/linkModel';
import { LinkCampaign_getSubMarketersLinkCampaign } from 'src/app/_requests/linkCampaign/linkCampaignModel';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';
import Swal from 'sweetalert2';
import { CampaignHttpService } from '../../../../_requests/linkCampaign/linkCampaign.service';
import { LinkHttpService } from '../../../../_requests/link/link.service';

@Component({
  selector: 'prms-manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
  styleUrls: ['./manage-campaigns.component.scss']
})
export class ManageCampaignsComponent implements OnInit {

  tooltips = ManagementTooltips;
  tableDataSource: PaginationModel<LinkCampaign_getSubMarketersLinkCampaign[]> = new PaginationModel<LinkCampaign_getSubMarketersLinkCampaign[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  sourceDto: Link_GetSourceListDto[] = []
  mediumDto: Link_GetMediumListDto[] = []
  tableFilterOptions: { name: string, source: string, medium: string } = {
    name: '',
    source: '',
    medium: ''
  };

  constructor(
    private dialog: MatDialog,
    private CampaignHttpService: CampaignHttpService,
    private LinkHttpService: LinkHttpService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.onGetListPagination();
    this.onGetSourceList();
    this.onGetMediumList()
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

  onBtnUpdateExistCampaignClick(_id: number) {
    this.CampaignHttpService.get({ Id: _id }).subscribe(res => {
      this.dialog.open(NewCampaignComponent, {
        data: {
          id: res.id,
          name: res.name,
          linkId: res.linkId,
          title: 'Update',
          management: true
        }
      }).afterClosed().subscribe(result => {
        this.onGetListPagination()
      });
    })
  }

  onGetListPagination() {
    this.tableDataSource.items = [];
    this.CampaignHttpService
      .getListPaginationChildren({
        'Params.PageNumber': this.tableDataSource.pageNumber,
        'Params.PageSize': 10,
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
