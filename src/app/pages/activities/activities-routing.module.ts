import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRelationshipsMarketer } from 'src/app/modules/auth/models/user-access.model';
import { RelationshipGuard } from 'src/app/_guards/relationship.guard';
import { ActivitiesComponent } from './activities.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('./overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'hierarchy',
        canActivate: [RelationshipGuard],
        data: { AllowedRelationships: [UserRelationshipsMarketer.Parent] },
        loadChildren: () =>
          import('./hierarchy/hierarchy.module').then((m) => m.HierarchyModule),
      },
      {
        path: 'activity',
        canActivate: [RelationshipGuard],
        data: { AllowedRelationships: [UserRelationshipsMarketer.Parent] },
        loadChildren: () =>
          import('./activity/activity.module').then((m) => m.ActivityModule),
      },
      {
        path: 'links',
        canActivate: [RelationshipGuard],
        data: { AllowedRelationships: [UserRelationshipsMarketer.Parent] },
        loadChildren: () =>
          import('./links/links.module').then((m) => m.LinksModule),
      },
      {
        path: 'campaigns',
        canActivate: [RelationshipGuard],
        data: { AllowedRelationships: [UserRelationshipsMarketer.Parent] },
        loadChildren: () =>
          import('./campaigns/campaigns.module').then((m) => m.CampaignsModule),
      },
      {
        path: 'contracts',
        loadChildren: () =>
          import('./contracts/contracts.module').then((m) => m.ContractsModule),
      },

      {
        path: 'documents',
        loadChildren: () =>
          import('./documents/documents.module').then((m) => m.DocumentsModule),
      },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesRoutingModule {}
