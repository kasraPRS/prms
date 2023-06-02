import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MarketersListComponent } from './marketers-list/marketers-list.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HighIncomeComponent } from './high-income/high-income.component';
import { MediumIncomeComponent } from './medium-income/medium-income.component';
import { LowIncomeComponent } from './low-income/low-income.component';
import { MarketersReturnToPlatformModule } from '../marketers-return-to-platform/marketers-return-to-platform.module';
import { MarketersIncomeModule } from '../marketers-income/marketers-income.module';
import { ActiveMarketersModule } from '../active-marketers/active-marketers.module';
import { InActiveMarketersModule } from '../in-active-marketers/in-active-marketers.module';
import { MarketersLinkCountModule } from '../marketers-link-count/marketers-link-count.module';
import { MarketersSuccessfulLinksModule } from '../marketers-successful-links/marketers-successful-links.module';
import { MarketersSuccessInUsModule } from '../marketers-success-in-us/marketers-success-in-us.module';
import { MarketersNumberInUsModule } from '../marketers-number-in-us/marketers-number-in-us.module';
import { MarketersSuccessInCanadaModule } from '../marketers-success-in-canada/marketers-success-in-canada.module';
import { MarketersNumberInCanadaModule } from '../marketers-number-in-canada/marketers-number-in-canada.module';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
];

@NgModule({
  declarations: [
    OverviewComponent,
    MarketersListComponent,
    HighIncomeComponent,
    MediumIncomeComponent,
    LowIncomeComponent
  ],
  imports: [
    SharedModule,
    NgbDropdownModule,
    RouterModule.forChild(routes),
    MarketersReturnToPlatformModule,
    MarketersIncomeModule,
    ActiveMarketersModule,
    InActiveMarketersModule,
    MarketersLinkCountModule,
    MarketersSuccessfulLinksModule,
    MarketersSuccessInUsModule,
    MarketersNumberInUsModule,
    MarketersSuccessInCanadaModule,
    MarketersNumberInCanadaModule
  ]
})
export class OverviewModule { }
