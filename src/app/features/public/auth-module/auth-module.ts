import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { LoginComponent } from './components/login-component/login-component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/inputs/text-input/text-input.component';
import { FormHeaderComponent } from '../../../shared/components/form-header-component/form-header-component';
import { MaterialModule } from '../../../shared/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { AUTH_FEATURE_SELECTOR_KEY } from './store/auth.constant';
import { authReducer } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effect';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TextInputComponent,
    FormHeaderComponent,
    MaterialModule,
    StoreModule.forFeature(AUTH_FEATURE_SELECTOR_KEY, authReducer),
    EffectsModule.forFeature(AuthEffects),
  ],
})
export class AuthModule {}
