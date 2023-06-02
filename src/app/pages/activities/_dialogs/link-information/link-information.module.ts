import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LinkInformationComponent } from './link-information.component';
import { FormsModule } from '@angular/forms';
import { CardsModule } from 'src/app/_metronic/partials';
import { InformationComponent } from './information/information.component';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  declarations: [
    LinkInformationComponent,
    InformationComponent,
    BannerComponent
  ],
  exports: [LinkInformationComponent],
  imports: [
    SharedModule,
    MatDialogModule,
    FormsModule,
    CardsModule
  ]
})
export class LinkInformationModule { }
