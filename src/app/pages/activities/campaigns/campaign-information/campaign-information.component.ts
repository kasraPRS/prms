import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { CampaignHttpService } from '../../../../_requests/linkCampaign/linkCampaign.service';
import { LinkHttpService } from '../../../../_requests/link/link.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NewLinkComponent } from '../../_dialogs/new-link/new-link.component';
import { CurrentUser } from 'src/app/_services/current-user.service';
import {
  Link_getListPaginationByLinkCampaignIdDTO,
  Link_GetMediumListDto,
  Link_GetSourceListDto
} from 'src/app/_requests/link/linkModel';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-campaign-information',
  templateUrl: './campaign-information.component.html',
})
export class CampaignInformationComponent implements OnInit {

  tooltips = ActivitiesTooltips;
  id: number = 0
  name: string = ''
  baseLinkUrl: string = environment.baseLinkUrl;
  tableDataSource: PaginationModel<Link_getListPaginationByLinkCampaignIdDTO[]> = new PaginationModel<Link_getListPaginationByLinkCampaignIdDTO[]>({
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
    private Router: Router,
    private clipboard: Clipboard
  ) {
    this.name = this.CampaignHttpService.getStateLinkCampaignName
    this.id = this.CampaignHttpService.getStateLinkCampaignId;
    if (this.id <= 0) {
      this.Router.navigate(['/activities/campaigns'])
    }
  }

  ngOnInit(): void {
    this.onGetListPaginationByLinkCampaignId();
    this.onGetSourceList();
    this.onGetMediumList();
  }

  onBtnChooseNewLinkClick() {
    this.dialog.open(NewLinkComponent, {
      data: {
        id: 0,
        name: '',
        url: '',
        linkCampaignId: this.id,
        title: 'new'
      }
    }).afterClosed().subscribe(result => {
      this.onGetListPaginationByLinkCampaignId()
    });
  }

  onBtnUpdateExistLinkClick(_id: number) {
    this.LinkHttpService.getLink({ Id: _id }).subscribe(res => {
      this.dialog.open(NewLinkComponent, {
        data: {
          id: res.id,
          name: res.name,
          url: res.url,
          linkCampaignId: res.linkCampaignId,
          title: 'update',
          source: res.source,
          medium: res.medium,
        }
      }).afterClosed().subscribe(result => {
        this.onGetListPaginationByLinkCampaignId()
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
            this.onGetListPaginationByLinkCampaignId()
          })
        }
      });
  }

  onGetListPaginationByLinkCampaignId() {
    this.tableDataSource.items = [];
    this.LinkHttpService
      .getListPaginationByLinkCampaignId({
        'Params.PageNumber': this.tableDataSource.pageNumber,
        'Params.PageSize': 10,
        LinkCampaignId: this.id,
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

  onBtnCopyUrlClick(_item: any) {
    this.clipboard.copy(this.baseLinkUrl + '/' + _item.url);
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
    this.onGetListPaginationByLinkCampaignId();
  }

  onBtnResetFilterClick() {
    this.tableFilterOptions = {
      name: '',
      source: '',
      medium: ''
    };
    this.onGetListPaginationByLinkCampaignId();
  }

}
