import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLinkComponent } from '../../_dialogs/new-link/new-link.component';
import { LinkHttpService } from '../../../../_requests/link/link.service';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { Link_getAllPaginationDTO } from 'src/app/_requests/link/linkModel';
import { CurrentUser } from 'src/app/_services/current-user.service';

@Component({
  selector: 'prms-recent-links',
  templateUrl: './recent-links.component.html',
})
export class RecentLinksComponent implements OnInit {

  tableDataSource: PaginationModel<Link_getAllPaginationDTO[]> = new PaginationModel<Link_getAllPaginationDTO[]>({
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
    private LinkHttpService: LinkHttpService,
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
  createNewLink() {
    this.dialog.open(NewLinkComponent, {
      data: {
        id: 0,
        name: '',
        url: '',
        linkCampaignId: 0,
        title: 'new'
      }
    }).afterClosed().subscribe(result => {
      this.onGetListPagination()
    });
  }

  onGetListPagination() {
    this.tableDataSource.items = [];
    this.LinkHttpService.
      getAllPagination({
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
