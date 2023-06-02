import { Routes } from '@angular/router';
import { RoleGuard } from '../_guards/role.guard';
import { MarketerResolver } from '../_resolver/user.resolver';

const Routing: Routes = [
  {
    path: 'administration',
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['admin'],
    },
    loadChildren: () =>
      import('./administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: 'management',
    canActivate: [RoleGuard],
    data: {
      notAllowedRoles: ['admin', 'level5'],
    },
    loadChildren: () =>
      import('./management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'activities',
    resolve: { readyMarketer: MarketerResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      notAllowedRoles: ['admin'],
      redirect: {
        user: {
          admin: { commands: '/administration/contracts' },
        },
        marketer: {
          admin: { commands: '/activities/overview' },
        },
      },
    },
    loadChildren: () =>
      import('./activities/activities.module').then((m) => m.ActivitiesModule),
  },
  {
    path: 'analytics',
    canActivate: [RoleGuard],
    data: {
      notAllowedRoles: ['level5'],
    },
    loadChildren: () =>
      import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
  },
  {
    path: 'reports',
    canActivate: [RoleGuard],
    data: {
      notAllowedRoles: ['level5'],
    },
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'account',
    resolve: { readyMarketer: MarketerResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./tests/tests-routing.module').then((m) => m.TestsRoutingModule),
  },
  {
    path: '',
    redirectTo: 'activities',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
