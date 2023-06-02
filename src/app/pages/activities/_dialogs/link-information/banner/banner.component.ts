import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { LinkHttpService } from 'src/app/_requests/link/link.service';
import { BannerHttpService } from 'src/app/_requests/banner/banner.service';
import { BannerModel, Banner_GetListAllDto } from 'src/app/_requests/banner/bannerModel';
import { LinkModel } from 'src/app/_requests/link/linkModel';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'prms-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit {

  serverImageUrl: string = environment.serverImageUrl;
  Banner_GetListAllDto: Banner_GetListAllDto[] = [];
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() back: EventEmitter<any> = new EventEmitter();
  choosingBanner: boolean = true;
  submittingChoosedBanner: boolean;
  file: File;;
  bannerObjDto: BannerModel;
  linkModel: LinkModel;
  code: string;
  submitting: boolean;

  constructor(
    private BannerHttpService: BannerHttpService,
    private LinkHttpService: LinkHttpService,
    private clipboard: Clipboard,
  ) { }

  ngOnInit(): void {
    this.onGetListAll()
    this.linkModel = this.LinkHttpService.getStateLinkModel
    if (this.linkModel.id <= 0) {
      document.getElementById('back')?.click();
    }
  }

  onChoosingBannerBtnNextClick(item: BannerModel) {
    this.bannerObjDto = item;
    this.code = `<a href="${this.linkModel.url}"><img style="width:100px;height:100;" src="${this.serverImageUrl}${item.url}"></a>`;
    this.submittingChoosedBanner = true;
    setTimeout(() => {
      this.submittingChoosedBanner = false;
      this.choosingBanner = false;
    }, 1000);
  }

  onEmbedSectionBtnNextClick() {
    const data = {
      id: this.bannerObjDto.id,
      linkId: this.linkModel.id
    }
    this.BannerHttpService.put(data).subscribe(res => {
      this.back.emit('List');
    })
  }

  onGetListAll() {
    this.BannerHttpService.getListAll().subscribe(res => {
      this.Banner_GetListAllDto = res.filter(q => q.linkId == null)
    });
  }

  onUploadBtnClick() {
    document.getElementById('fileUploader')?.click();
  }

  onFileUploadeChange(event: FileList) {
    this.submitting = true;
    this.file = event.item(0)!;
    if (this.file) {
      const BODY = new FormData();
      BODY.append('file', this.file);
      this.BannerHttpService.create(BODY).subscribe(res => {
        this.submitting = false;
        this.onGetListAll()
      });
    }
  }

  onBtnDoneUploadFile() {

  }

  onBtnCopyEmbedClick() {
    this.clipboard.copy(this.code);
  }

  onBtnRemoveBannerClick(item: any) {
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
          this.BannerHttpService.delete({ id: item.id }).subscribe(result => {
            this.onGetListAll()
          })
        }
      });
  }

}
