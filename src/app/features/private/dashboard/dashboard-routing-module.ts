import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';

const routes: Routes = [
  {
    path: ROUTER_PATHS.DASHBOARD,
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
