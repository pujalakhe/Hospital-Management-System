import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing-module';
import { SignupComponent } from './component/signup-component';
import { MaterialModule } from '../../../../shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../../shared/components/inputs/text-input/text-input.component';
import { InputNumberComponent } from '../../../../shared/components/inputs/input-number-component/input-number-component';
import { SelectInputComponent } from '../../../../shared/components/inputs/select-input/select-input.component';
import { DateInputComponent } from '../../../../shared/components/inputs/date-input/date-input.component';
import { StoreModule } from '@ngrx/store';
import { signupReducer } from './store/signup.reducer';
import { EffectsModule } from '@ngrx/effects';
import { signupEffects } from './store/signup.effects';
import { SIGNUP_FEATURE_SELECTOR_KEY } from './constants/signup.constant';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TextInputComponent,
    InputNumberComponent,
    SelectInputComponent,
    DateInputComponent,
    StoreModule.forFeature(SIGNUP_FEATURE_SELECTOR_KEY, signupReducer),
    EffectsModule.forFeature([signupEffects]),
  ],
})
export class SignupModule {}
