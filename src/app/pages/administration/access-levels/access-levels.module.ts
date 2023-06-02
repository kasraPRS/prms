import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessLevelsComponent } from './access-levels.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccessLevelsListComponent } from './access-levels-list/access-levels-list.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: AccessLevelsComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AccessLevelsComponent,
    AccessLevelsListComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AccessLevelsModule { }
