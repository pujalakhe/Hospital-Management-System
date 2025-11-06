import { createAction, props } from '@ngrx/store';
import { City } from '../../model/city.model';
import {
  LOAD_CITIES_BY_COUNTRY,
  LOAD_CITIES_BY_COUNTRY_SUCCESS,
  LOAD_CITIES_BY_COUNTRY_FAILURE,
} from './cityListByCountryId.constant';

export const loadCitiesByCountry = createAction(
  LOAD_CITIES_BY_COUNTRY,
  props<{ countryId: number }>()
);

export const loadCitiesByCountrySuccess = createAction(
  LOAD_CITIES_BY_COUNTRY_SUCCESS,
  props<{ cities: City[] }>()
);

export const loadCitiesByCountryFailure = createAction(
  LOAD_CITIES_BY_COUNTRY_FAILURE,
  props<{ error: any }>()
);
