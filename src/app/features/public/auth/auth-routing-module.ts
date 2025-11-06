import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

const { RESET_PASSWORD } = ROUTER_PATHS;

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login-module').then((m) => m.LoginModule),
  },
  {
    path: '', loadChildren: () =>
      import('./reset-password/reset-password-module').then((m) => m.ResetPasswordModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
