import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './components/login-component/login-component';
import { TextInputComponent } from '../../../shared/components/inputs/text-input/text-input.component';
import { FormHeaderComponent } from '../../../shared/components/form-header-component/form-header-component';
import { LoaderComponent } from '../../../shared/components/loader-component/loader-component';

import { AUTH_FEATURE_SELECTOR_KEY } from './store/auth.constant';
import { authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effect';
import { ResetPasswordComponent } from './components/reset-password-component/reset-password-component';
import { resetPasswordFeatureKey } from './store/reset-password-store/reset-password.state';
import { resetPasswordReducer } from './store/reset-password-store/reset-password.reducer';
import { ResetPasswordEffects } from './store/reset-password-store/reset-password.effect';

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TextInputComponent,
    FormHeaderComponent,
    LoaderComponent,
    StoreModule.forFeature(AUTH_FEATURE_SELECTOR_KEY, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(resetPasswordFeatureKey, resetPasswordReducer),
    EffectsModule.forFeature([ResetPasswordEffects]),
  ],
})
export class AuthModule {}
