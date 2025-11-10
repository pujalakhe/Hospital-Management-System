import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

const routes: Routes = [
  {
    path: ROUTER_PATHS.DASHBOARD,
    component: Dashboard,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
