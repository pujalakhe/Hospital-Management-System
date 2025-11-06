import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

const { CHANGE_PASSWORD } = ROUTER_PATHS;

const routes: Routes = [
  {
    path: CHANGE_PASSWORD,
    component: ChangePasswordComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordRoutingModule {}
