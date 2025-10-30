import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { LoginComponent } from './components/login-component/login-component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/inputs/text-input/text-input.component';
import { FormHeaderComponent } from '../../../shared/components/form-header-component/form-header-component';
import { MaterialModule } from '../../../shared/angular-material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TextInputComponent,
    FormHeaderComponent,
    MaterialModule,
  ],
})
export class AuthModule {}
