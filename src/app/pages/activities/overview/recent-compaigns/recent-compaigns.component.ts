import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCampaignComponent } from '../../_dialogs/new-campaign/new-campaign.component';
import { CampaignHttpService } from '../../../../_requests/linkCampaign/linkCampaign.service';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { LinkCampaign_getAllPaginationDTO } from 'src/app/_requests/linkCampaign/linkCampaignModel';
import { CurrentUser } from 'src/app/_services/current-user.service';

@Component({
  selector: 'prms-recent-compaigns',
  templateUrl: './recent-compaigns.component.html',
})
export class RecentCompaignsComponent implements OnInit {

  tableDataSource: PaginationModel<LinkCampaign_getAllPaginationDTO[]> = new PaginationModel<LinkCampaign_getAllPaginationDTO[]>({
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

  constructor(
    private dialog: MatDialog,
    private CampaignHttpService: CampaignHttpService,
    // private marketerUser: MarketerUser,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.getProfileOwnerInfo();
    this.onGetListPagination()
  }

  // getProfileOwnerInfo() {
  //   this.profileOwnerId = this.marketerUser.marketer.id;
  // }

  // Methods
  createNewCampaigns() {
    this.dialog.open(NewCampaignComponent, {
      data: {
        id: 0,
        name: '',
        linkId: [],
        title: "new"
      }
    }).afterClosed().subscribe(result => {
      this.onGetListPagination()
    });
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

}
