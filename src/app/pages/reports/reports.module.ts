import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketersIncomeModule } from './marketers-income/marketers-income.module';
import { ActiveMarketersModule } from './active-marketers/active-marketers.module';
import { InActiveMarketersModule } from './in-active-marketers/in-active-marketers.module';
import { MarketersLinkCountModule } from './marketers-link-count/marketers-link-count.module';
import { MarketersSuccessfulLinksModule } from './marketers-successful-links/marketers-successful-links.module';
import { MarketersSuccessInUsModule } from './marketers-success-in-us/marketers-success-in-us.module';
import { MarketersNumberInUsModule } from './marketers-number-in-us/marketers-number-in-us.module';
import { MarketersSuccessInCanadaModule } from './marketers-success-in-canada/marketers-success-in-canada.module';
import { MarketersNumberInCanadaModule } from './marketers-number-in-canada/marketers-number-in-canada.module';
import { RecurringReportModule } from './recurring-report/recurring-report.module';
import { MarketersReturnToPlatformModule } from './marketers-return-to-platform/marketers-return-to-platform.module';

@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    SharedModule,
    ReportsRoutingModule,
    MarketersIncomeModule,
    ActiveMarketersModule,
    InActiveMarketersModule,
    MarketersLinkCountModule,
    MarketersSuccessfulLinksModule,
    MarketersSuccessInUsModule,
    MarketersNumberInUsModule,
    MarketersSuccessInCanadaModule,
    MarketersNumberInCanadaModule,
    RecurringReportModule,
    MarketersReturnToPlatformModule,
  ]
})
export class ReportsModule { }
