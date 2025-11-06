import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CityState } from './cityListByCountryId.reducer';
import { CITY_FEATURE_SELECTOR_KEY } from './cityListByCountryId.constant';

export const selectCityState = createFeatureSelector<CityState>(
  CITY_FEATURE_SELECTOR_KEY
);

export const selectAllCities = createSelector(
  selectCityState,
  (state) => state.cities
);

export const selectCityLoading = createSelector(
  selectCityState,
  (state) => state.loading
);

export const selectCityError = createSelector(
  selectCityState,
  (state) => state.error
);
