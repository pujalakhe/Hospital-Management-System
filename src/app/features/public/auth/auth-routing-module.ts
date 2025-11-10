import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

<<<<<<< HEAD
const { SIGNUP, RESET_PASSWORD } = ROUTER_PATHS;
=======
const { RESET_PASSWORD, SIGNUP } = ROUTER_PATHS;
>>>>>>> 6b581f8abe0fcaf6ad1ff16495cbaaf1ee0f827d

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login-module').then((m) => m.LoginModule),
  },
  {
    path: RESET_PASSWORD,
    loadChildren: () =>
      import('./reset-password/reset-password-module').then((m) => m.ResetPasswordModule),
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
