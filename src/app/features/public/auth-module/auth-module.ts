import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { LoginComponent } from './components/login-component/login-component';


@NgModule({
  declarations: [
    Logincomponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
