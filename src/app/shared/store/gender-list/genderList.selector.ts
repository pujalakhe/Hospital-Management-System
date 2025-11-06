import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenderState } from './genderList.reducer';
import { GENDER_FEATURE_SELECTOR_KEY } from './genderList.constant';

export const selectGenderState = createFeatureSelector<GenderState>(
  GENDER_FEATURE_SELECTOR_KEY
);

export const selectGenderList = createSelector(
  selectGenderState,
  (state) => state.genderList
);

export const selectGenderLoading = createSelector(
  selectGenderState,
  (state) => state.loading
);

export const selectGenderError = createSelector(
  selectGenderState,
  (state) => state.error
);
