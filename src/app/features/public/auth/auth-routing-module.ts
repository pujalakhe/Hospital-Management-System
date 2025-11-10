import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

const { SIGNUP, RESET_PASSWORD } = ROUTER_PATHS;

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login-module').then((m) => m.LoginModule),
  },

  {
    path: SIGNUP,
    loadChildren: () =>
      import('./signup/signup-module').then((m) => m.SignupModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
