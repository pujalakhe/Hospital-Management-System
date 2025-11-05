import { createReducer, on } from '@ngrx/store';
import * as CityActions from './cityList.action';
import { City } from '../../model/city.model';

export interface CityState {
  cities: City[];
  loading: boolean;
  error: any;
}

export const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
};

export const cityReducer = createReducer(
  initialState,

  on(CityActions.loadCity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CityActions.loadCitySuccess, (state, { cities }) => ({
    ...state,
    loading: false,
    cities,
  })),

  on(CityActions.loadCityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
