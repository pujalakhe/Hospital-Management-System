import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard/auth-guard';
import { ROUTER_PATHS } from './core/constants/router-path.constant';
import { WrapperComponent } from './shared/components/wrapper-component/wrapper-component/wrapper-component';
import { DashboardComponent } from './features/private/dashboard/components/dashboard-component/dashboard-component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/public/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/private/dashboard/dashboard-module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/private/change-password/change-password-module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: ROUTER_PATHS.LEAVE,
    loadChildren: () =>
      import('./features/private/leave/leave-module').then(
        (m) => m.LeaveModule
      ),
  },
  {
    path: 'wrapper',
    component: WrapperComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
