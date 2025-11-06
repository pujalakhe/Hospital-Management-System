import { createAction, props } from '@ngrx/store';
import { Country } from '../../model/country.model';
import {
  LOAD_COUNTRIES,
  LOAD_COUNTRIES_FAILURE,
  LOAD_COUNTRIES_SUCCESS,
} from './countryList.constant';

export const loadCountries = createAction(LOAD_COUNTRIES);

export const loadCountriesSuccess = createAction(
  LOAD_COUNTRIES_SUCCESS,
  props<{ countries: Country[] }>()
);

export const loadCountriesFailure = createAction(
  LOAD_COUNTRIES_FAILURE,
  props<{ error: any }>()
);
