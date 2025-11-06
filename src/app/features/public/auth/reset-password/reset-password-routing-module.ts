import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './component/reset-password-component';
import { ROUTER_PATHS } from '../../../../core/constants/router-path.constant';

const { RESET_PASSWORD } = ROUTER_PATHS;

const routes: Routes = [
  {path: RESET_PASSWORD, component:  ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
