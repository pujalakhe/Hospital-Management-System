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
import { cityReducer } from '../../../../shared/store/city-list-by-countryId/cityListByCountryId.reducer';
import { CITY_FEATURE_SELECTOR_KEY } from '../../../../shared/store/city-list-by-countryId/cityListByCountryId.constant';
import { CityByCountryIdEffects } from '../../../../shared/store/city-list-by-countryId/cityListByCountryId.effect';
import { COUNTRY_FEATURE_SELECTOR_KEY } from '../../../../shared/store/country-list/countryList.constant';
import { countryReducer } from '../../../../shared/store/country-list/countryList.reducer';
import { CountryEffects } from '../../../../shared/store/country-list/countryList.effect';
import { DEPARTMENT_FEATURE_SELECTOR_KEY } from '../../../../shared/store/department-list/departmentList.constant';
import { departmentReducer } from '../../../../shared/store/department-list/departmentList.reducer';
import { DepartmentEffects } from '../../../../shared/store/department-list/departmentList.effect';
import { ROLE_FEATURE_SELECTOR_KEY } from '../../../../shared/store/role-list/roleList.constant';
import { roleReducer } from '../../../../shared/store/role-list/roleList.reducer';
import { RoleEffects } from '../../../../shared/store/role-list/roleList.effect';
// import { RadioInputComponent } from '../../../../shared/components/inputs/radio-input/radio-input.component';
import { GENDER_FEATURE_SELECTOR_KEY } from '../../../../shared/store/gender-list/genderList.constant';
import { genderReducer } from '../../../../shared/store/gender-list/genderList.reducer';
import { GenderEffects } from '../../../../shared/store/gender-list/genderList.effect';
import { FormHeaderComponent } from '../../../../shared/components/form-header-component/form-header-component';

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
