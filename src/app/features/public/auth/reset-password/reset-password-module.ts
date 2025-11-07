import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { resetPasswordReducer} from './store/reset-password.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ResetPasswordComponent } from './component/reset-password-component';
import { ResetPasswordEffects } from './store/reset-password.effect';
import { ResetPasswordRoutingModule } from './reset-password-routing-module';
import { TextInputComponent } from '../../../../shared/components/inputs/text-input/text-input.component';
import { NoPasteDirective } from '../../../../shared/custom-directives/no-paste/no-paste-directive';
import { LoaderComponent } from '../../../../shared/components/loader-component/loader-component';
import { FormHeaderComponent } from '../../../../shared/components/form-header-component/form-header-component';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    TextInputComponent,
    NoPasteDirective,
    LoaderComponent,
    FormHeaderComponent,
    ResetPasswordRoutingModule,
    StoreModule.forFeature('resetPassword', resetPasswordReducer),
    EffectsModule.forFeature([ResetPasswordEffects])
  ]
})
export class ResetPasswordModule { }
