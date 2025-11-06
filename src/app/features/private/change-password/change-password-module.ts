import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing-module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { StoreModule } from '@ngrx/store';
import { changePasswordReducer } from './store/change-password/changePassword.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChangePasswordEffects } from './store/change-password/changePassword.effect';
import { MaterialModule } from '../../../shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/inputs/text-input/text-input.component';
import { FormHeaderComponent } from '../../../shared/components/form-header-component/form-header-component';
import { LoaderComponent } from '../../../shared/components/loader-component/loader-component';
import { CHANGE_PASSWORD_FEATURE_KEY } from './store/change-password/changePassword.constant';
import { AutoFocusInput } from '../../../shared/custom-directives/AutoFocusInput/auto-focus-input';
import { AutoFocusInvalid } from '../../../shared/custom-directives/AutoFocusInvalid/auto-focus-invalid';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TextInputComponent,
    FormHeaderComponent,
    LoaderComponent,
    AutoFocusInput,
    AutoFocusInvalid,
    ChangePasswordRoutingModule,
    StoreModule.forFeature(CHANGE_PASSWORD_FEATURE_KEY, changePasswordReducer),
    EffectsModule.forFeature([ChangePasswordEffects]),
  ],
})
export class ChangePasswordModule {}
