import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/angular-material.module';

import { LoginRoutingModule } from './login-routing-module';
import { LoginComponent } from './components/login-component/login-component';
import { FormHeaderComponent } from '../../../../shared/components/form-header-component/form-header-component';
import { LoaderComponent } from '../../../../shared/components/loader-component/loader-component';
import { TextInputComponent } from '../../../../shared/components/inputs/text-input/text-input.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LOGIN_FEATURE_SELECTOR_KEY } from './store/login.constant';
import { LoginEffects } from './store/login.effect';
import { loginReducer } from './store/login.reducer';

import { AutoFocusInput } from '../../../../shared/custom-directives/AutoFocusInput/auto-focus-input';
import { AutoFocusInvalid } from '../../../../shared/custom-directives/AutoFocusInvalid/auto-focus-invalid';

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
    StoreModule.forFeature(LOGIN_FEATURE_SELECTOR_KEY, loginReducer),
    EffectsModule.forFeature(LoginEffects),
    AutoFocusInput,
    AutoFocusInvalid,
  ],
})
export class LoginModule {}
