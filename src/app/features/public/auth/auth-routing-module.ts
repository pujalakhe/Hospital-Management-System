import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';
import { noAuthGuard } from '../../../core/guards/no-auth-guard/no-auth-guard';

const { RESET_PASSWORD, SIGNUP } = ROUTER_PATHS;

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login-module').then((m) => m.LoginModule),
  },
  {
    path: RESET_PASSWORD,
    loadChildren: () =>
      import('./reset-password/reset-password-module').then(
        (m) => m.ResetPasswordModule
      ),
  },

  {
    path: SIGNUP,
    canMatch: [noAuthGuard],
    loadChildren: () =>
      import('./signup/signup-module').then((m) => m.SignupModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
