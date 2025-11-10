import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { noAuthGuard } from '../../../../core/guards/no-auth-guard/no-auth-guard';
import { ROUTER_PATHS } from '../../../../core/constants/router-path.constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_PATHS.LOGIN,
    pathMatch: 'full',
  },
  {
    path: ROUTER_PATHS.LOGIN,
    canMatch: [noAuthGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
