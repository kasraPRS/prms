import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { LinkHttpService } from '../../../../../_requests/link/link.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { CurrentUser } from 'src/app/_services/current-user.service';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import { BannerHttpService } from 'src/app/_requests/banner/banner.service';
import { Banner_GetListByLinkDto } from 'src/app/_requests/banner/bannerModel';
import { LinkCampaign_getListAllDTO } from 'src/app/_requests/linkCampaign/linkCampaignModel';
import { CampaignHttpService } from 'src/app/_requests/linkCampaign/linkCampaign.service';
import { LinkModel, Link_GetMediumListDto, Link_GetSourceListDto } from 'src/app/_requests/link/linkModel';
import { environment } from 'src/environments/environment';
import { ActivitiesTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-information',
  templateUrl: './information.component.html',
})
export class InformationComponent implements OnInit {

  tooltips = ActivitiesTooltips;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = true;
  private unsubscribe: Subscription[] = [];
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() addBannerBtnClick: EventEmitter<any> = new EventEmitter();
  @Input() banner: any;
  Banner_GetListByLinkDto: Banner_GetListByLinkDto[] = []
  campaigns: LinkCampaign_getListAllDTO[] = [];

  campaignId: number
  url: string;
  linkurl: string;
  id: number;
  name: string;
  createdBy: string;
  profileOwnerId: number;
  sourceDto: Link_GetSourceListDto[] = [];
  mediumDto: Link_GetMediumListDto[] = [];
  source: string = ''
  medium: string = ''
  _source: string = ''
  _medium: string = ''
  serverImageUrl: string = environment.serverImageUrl;
  baseLinkUrl: string = environment.baseLinkUrl;

  constructor(
    private CampaignHttpService: CampaignHttpService,
    private cdr: ChangeDetectorRef,
    private LinkHttpService: LinkHttpService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clipboard: Clipboard,
    private marketerUser: MarketerUser,
    private BannerHttpService: BannerHttpService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    if (data) {
      this.url = data.url;
      this.linkurl = this.baseLinkUrl + '/' + data.encriptedInfo;
      this.id = data.id;
      this.name = data.name;
      this.campaignId = data.linkCampaignId;
      this.createdBy = data.createdBy;
      this.source = data.source;
      this.medium = data.medium;

      let linkModel: LinkModel = {
        id: this.id,
        linkCampaignId: this.campaignId,
        linkCampaignName: '',
        medium: "",
        name: this.name,
        url: this.url,
        source: ''
      }
      this.LinkHttpService.setStateLinkModel(linkModel)
    }
  }

  ngOnInit(): void {
    this.getProfileOwnerInfo();
    this.onGetListAll();
    this.onGetListBanner();
    this.onGetSourceList();
    this.onGetMediumList();
  }

  getProfileOwnerInfo() {
    this.profileOwnerId = this.marketerUser.marketer.id;
  }

  onBtnApplyClick() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.cdr.detectChanges();
      this.close.emit();
    }, 1500);

    const data = {
      id: this.id,
      name: this.name,
      linkCampaignId: this.campaignId,
      url: this.url,
      userId: CurrentUser.userId,
      source: this._source,
      medium: this._medium
    }
    this.LinkHttpService.put(data).subscribe(result => {
      // do nothing    
    })
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  onBtnDeleteLinkClick(_id: number) {
    Swal.fire(
      {
        title: 'Are you sure you want to delete this item?',
        html: this.name,
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {
          this.LinkHttpService.delete({ Id: _id }).subscribe(result => {
            this.close.emit();
          })
        }
      });
  }

  onGetListAll() {
    this.CampaignHttpService.getListAll({ UserId: this.profileOwnerId }).subscribe(res => {
      this.campaigns = res;
      this.cdr.detectChanges();
    });
  }

  onBtnViewClick() {
    window.open(this.url)
  }

  onBtnCopyClipboardClick() {
    this.clipboard.copy(this.linkurl);
  }

  onBtnCopyLinkBannerClick(_item: any) {
    this.clipboard.copy(_item.code);
  }

  onGetListBanner() {
    const that = this;
    this.BannerHttpService.getListByLink(this.id).subscribe(res => {
      this.Banner_GetListByLinkDto = res;
      if (this.Banner_GetListByLinkDto.length > 0) {
        this.Banner_GetListByLinkDto.forEach(function (value, key) {
          value.code = `<a href="${that.url}"><img style="width:100px;height:100;" src="${that.serverImageUrl}${value.url}"></a>`;
        });
      }
    });
  }

  private onGetSourceList() {
    this.LinkHttpService.getSourceList({ Source: "", UserId: CurrentUser.userId }).subscribe(res => {
      this.sourceDto = [];
      this.sourceDto = res;
      this.cdr.detectChanges();
    });
  }

  private onGetMediumList() {
    this.LinkHttpService.getMediumList({ Medium: "", UserId: CurrentUser.userId }).subscribe(res => {
      this.mediumDto = [];
      this.mediumDto = res;
      this.cdr.detectChanges();
    });
  }

  onChangeSource(_data: any) {
    this._source = _data.value
  }

  onChangeMedium(_data: any) {
    this._medium = _data.value
  }

  onBtnRemoveBannerLinkClick(item: any) {
    Swal.fire(
      {
        title: 'Are you sure you want to delete this item ?',
        html: '',
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {
          this.BannerHttpService.deleteBannerLink({ id: item.id }).subscribe(result => {
            this.onGetListBanner()
          })
        }
      });
  }

}
