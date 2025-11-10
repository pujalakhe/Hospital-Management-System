import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../../../shared/angular-material.module';
import { DateInputComponent } from '../../../../shared/components/inputs/date-input/date-input.component';
import { InputNumberComponent } from '../../../../shared/components/inputs/input-number-component/input-number-component';
import { SelectInputComponent } from '../../../../shared/components/inputs/select-input/select-input.component';
import { TextInputComponent } from '../../../../shared/components/inputs/text-input/text-input.component';
import { CITY_FEATURE_SELECTOR_KEY } from '../../../../shared/store/city-list-by-countryId/cityListByCountryId.constant';
import { CityByCountryIdEffects } from '../../../../shared/store/city-list-by-countryId/cityListByCountryId.effect';
import { cityReducer } from '../../../../shared/store/city-list-by-countryId/cityListByCountryId.reducer';
import { COUNTRY_FEATURE_SELECTOR_KEY } from '../../../../shared/store/country-list/countryList.constant';
import { CountryEffects } from '../../../../shared/store/country-list/countryList.effect';
import { countryReducer } from '../../../../shared/store/country-list/countryList.reducer';
import { DEPARTMENT_FEATURE_SELECTOR_KEY } from '../../../../shared/store/department-list/departmentList.constant';
import { DepartmentEffects } from '../../../../shared/store/department-list/departmentList.effect';
import { departmentReducer } from '../../../../shared/store/department-list/departmentList.reducer';
import { ROLE_FEATURE_SELECTOR_KEY } from '../../../../shared/store/role-list/roleList.constant';
import { RoleEffects } from '../../../../shared/store/role-list/roleList.effect';
import { roleReducer } from '../../../../shared/store/role-list/roleList.reducer';
import { SignupComponent } from './component/signup-component';
import { SIGNUP_FEATURE_SELECTOR_KEY } from '../../auth/signup/store/signup.constants';
import { SignupRoutingModule } from './signup-routing-module';
import { signupEffects } from './store/signup.effects';
import { signupReducer } from './store/signup.reducer';
import { FormHeaderComponent } from '../../../../shared/components/form-header-component/form-header-component';
import { TransformRolePipe } from '../../../../shared/pipes/transform-object/transform-object-pipe';
import { GENDER_FEATURE_SELECTOR_KEY } from '../../../../shared/store/gender-list/genderList.constant';
import { GenderEffects } from '../../../../shared/store/gender-list/genderList.effect';
import { genderReducer } from '../../../../shared/store/gender-list/genderList.reducer';
import { LoaderComponent } from '../../../../shared/components/loader-component/loader-component';
import { AutoFocusInput } from '../../../../shared/custom-directives/AutoFocusInput/auto-focus-input';
import { AutoFocusInvalid } from '../../../../shared/custom-directives/AutoFocusInvalid/auto-focus-invalid';
import { NoPasteDirective } from '../../../../shared/custom-directives/no-paste/no-paste-directive';

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
    FormHeaderComponent,
    TransformRolePipe,
    LoaderComponent,
    AutoFocusInput,
    AutoFocusInvalid,
    NoPasteDirective,
    StoreModule.forFeature(SIGNUP_FEATURE_SELECTOR_KEY, signupReducer),
    StoreModule.forFeature(CITY_FEATURE_SELECTOR_KEY, cityReducer),
    StoreModule.forFeature(COUNTRY_FEATURE_SELECTOR_KEY, countryReducer),
    StoreModule.forFeature(DEPARTMENT_FEATURE_SELECTOR_KEY, departmentReducer),
    StoreModule.forFeature(ROLE_FEATURE_SELECTOR_KEY, roleReducer),
    StoreModule.forFeature(GENDER_FEATURE_SELECTOR_KEY, genderReducer),
    EffectsModule.forFeature([
      signupEffects,
      CityByCountryIdEffects,
      CountryEffects,
      DepartmentEffects,
      RoleEffects,
      GenderEffects,
    ]),
  ],
})
export class SignupModule {}
