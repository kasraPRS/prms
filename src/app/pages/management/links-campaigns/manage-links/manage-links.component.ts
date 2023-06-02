import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { NewLinkComponent } from 'src/app/pages/activities/_dialogs/new-link/new-link.component';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { CurrentUser } from 'src/app/_services/current-user.service';
import Swal from 'sweetalert2';
import { LinkHttpService } from '../../../../_requests/link/link.service'
import { Clipboard } from '@angular/cdk/clipboard';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import {  
  Link_GetMediumListDto,
  Link_GetSourceListDto,
  Link_getSubMarketersLinkDTO
} from 'src/app/_requests/link/linkModel';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'prms-manage-links',
  templateUrl: './manage-links.component.html',
  styleUrls: ['./manage-links.component.scss']
})
export class ManageLinksComponent implements OnInit {

  baseLinkUrl: string = environment.baseLinkUrl;
  tooltips = ManagementTooltips;
  tableDataSource: PaginationModel<Link_getSubMarketersLinkDTO[]> = new PaginationModel<Link_getSubMarketersLinkDTO[]>({
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 1,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  tableFilterOptions: { name: string, source: string, medium: string } = {
    name: '',
    source: '',
    medium: ''
  };
  sourceDto: Link_GetSourceListDto[] = []
  mediumDto: Link_GetMediumListDto[] = [];

  constructor(
    private LinkHttpService: LinkHttpService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private marketerUser: MarketerUser
  ) {}

  ngOnInit(): void {
    this.onGetListPagination();
    this.onGetSourceList();
    this.onGetMediumList();
  }

  onGetListPagination() {
    this.tableDataSource.items = [];
    this.LinkHttpService.
      getSubMarketersLink({
        'Params.PageNumber': this.tableDataSource.pageNumber,
        'Params.PageSize': 10,
        Name: this.tableFilterOptions.name,
        userId: CurrentUser.userId,
        Source: this.tableFilterOptions.source,
        Medium: this.tableFilterOptions.medium
      })
      .subscribe(res => {
        this.tableDataSource = res;
        this.cdr.detectChanges();
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
          title: 'Update',
          management: true,
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
    this.clipboard.copy(`www.helpahand.com/terminal/` + _item.url);
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
    this.LinkHttpService.getMediumList({ Medium: this.tableFilterOptions.source, UserId: CurrentUser.userId })
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
