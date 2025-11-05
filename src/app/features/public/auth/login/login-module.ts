import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing-module';
import { LoginComponent } from './components/login-component/login-component';
import { MaterialModule } from '../../../../shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormHeaderComponent } from '../../../../shared/components/form-header-component/form-header-component';
import { LoaderComponent } from '../../../../shared/components/loader-component/loader-component';
import { TextInputComponent } from '../../../../shared/components/inputs/text-input/text-input.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormHeaderComponent,
    LoaderComponent,
    TextInputComponent,
  ],
})
export class LoginModule {}
