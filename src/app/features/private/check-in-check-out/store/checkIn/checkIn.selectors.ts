import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckInState } from './checkIn.reducer';
import { CHECK_IN_FEATURE_SELECTOR_KEY } from './checkIn.constants';

export const selectCheckInState = createFeatureSelector<CheckInState>(
  CHECK_IN_FEATURE_SELECTOR_KEY
);

export const selectLoading = createSelector(
  selectCheckInState,
  (s) => s.loading
);
export const selectError = createSelector(selectCheckInState, (s) => s.error);
