import { createAction, props } from '@ngrx/store';
import {
  LOAD_CITY,
  LOAD_CITY_FAILURE,
  LOAD_CITY_SUCCESS,
} from './clityList.constant';
import { City } from '../../model/city.model';

export const loadCity = createAction(LOAD_CITY);

export const loadCitySuccess = createAction(
  LOAD_CITY_SUCCESS,
  props<{ cities: City[] }>()
);

export const loadCityFailure = createAction(
  LOAD_CITY_FAILURE,
  props<{ error: any }>()
);
