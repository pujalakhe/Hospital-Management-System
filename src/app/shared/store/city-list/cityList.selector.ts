import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CityState } from './cityList.reducer';
import { CITY_FEATURE_SELECTOR_KEY } from './clityList.constant';

export const selectCityState = createFeatureSelector<CityState>(
  CITY_FEATURE_SELECTOR_KEY
);

export const selectAllCity = createSelector(
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
