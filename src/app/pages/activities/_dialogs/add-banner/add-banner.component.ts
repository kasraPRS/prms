import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BannerDto } from 'src/app/_models/Banners/bannerDto';
import { BannerHttpService } from '../../../../_requests/Banner.service'

@Component({
  selector: 'prms-add-banner',
  templateUrl: './add-banner.component.html',
})
export class AddBannerComponent implements OnInit {

  // private BannerDto: BannerDto;
  // templatesList: any[] = [1, 1, 1, 1, 1, 1];
  @Output() back: EventEmitter<any> = new EventEmitter();

  constructor(
    private BannerHttpService: BannerHttpService,
  ) { }

  ngOnInit(): void {
    // this.BannerDto = this.BannerHttpService.getStateModel

  }

  close() { }

}
