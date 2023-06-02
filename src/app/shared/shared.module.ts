import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { PipesModule } from '../_pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../_directives/directives.module';
import { NgmValidationsModule } from '../_ngmValidations/ngm-validations.module';
import { ModulesModule } from '../_modules/modules.module';
import { MatSidenavModule } from '@angular/material/sidenav';

/* Bootstrap Modules */
import { MatTooltipModule } from '@angular/material/tooltip';

/* Bootstrap Modules */
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

const MaterialModules = [
  MatTooltipModule,
];

const BootstrapModules = [
  NgbTooltipModule
];

@NgModule({
  declarations: [],
  imports: [MatSidenavModule],
  exports: [
    CommonModule,
    InlineSVGModule,
    PipesModule,
    MatDialogModule,
    DirectivesModule,
    NgSelectModule,
    ModulesModule,
    FormsModule,
    ReactiveFormsModule,
    NgmValidationsModule,
    MatSidenavModule,
    

    /* Material Modules */
    // ...MaterialModules,
    RouterModule,

    /* Bootstrap Modules */
    ...BootstrapModules,
  ],
})
export class SharedModule {}
