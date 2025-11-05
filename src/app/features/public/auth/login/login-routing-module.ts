import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_PATHS } from '../../../../core/constants/router-path.constant';
import { LoginComponent } from './components/login-component/login-component';

const { LOGIN } = ROUTER_PATHS;
const routes: Routes = [
  {
    path: '',
    redirectTo: LOGIN,
    pathMatch: 'full',
  },
  {
    path: LOGIN,
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
