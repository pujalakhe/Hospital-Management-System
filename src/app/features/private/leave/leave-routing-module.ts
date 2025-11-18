import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

const routes: Routes = [
  {
    path: ROUTER_PATHS.COUNT,
    loadChildren: () =>
      import('./leave-count/leave-count-module').then(
        (m) => m.LeaveCountModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveRoutingModule {}
