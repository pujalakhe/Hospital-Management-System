import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';
import { ResetPasswordComponent } from './components/reset-password-component/reset-password-component';

const { LOGIN, RESET_PASSWORD } = ROUTER_PATHS;
const routes: Routes = [
  { path: '', redirectTo: LOGIN, pathMatch: 'full' },
  {
    path: LOGIN,
    component: LoginComponent,
  },
  {
    path: RESET_PASSWORD, component: ResetPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
