import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './countryList.reducer';
import { COUNTRY_FEATURE_SELECTOR_KEY } from './countryList.constant';

export const selectCountryState = createFeatureSelector<CountryState>(
  COUNTRY_FEATURE_SELECTOR_KEY
);

export const selectAllCountries = createSelector(
  selectCountryState,
  (state) => state.countries
);

export const selectCountryLoading = createSelector(
  selectCountryState,
  (state) => state.loading
);

export const selectCountryError = createSelector(
  selectCountryState,
  (state) => state.error
);
