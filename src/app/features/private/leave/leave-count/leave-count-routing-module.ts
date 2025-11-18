import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveCountListComponent } from './components/leave-count-list-component/leave-count-list-component';
import { ROUTER_PATHS } from '../../../../core/constants/router-path.constant';

const routes: Routes = [
  {
    path: ROUTER_PATHS.LIST,
    component: LeaveCountListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveCountRoutingModule {}
