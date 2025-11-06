import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignupState } from './signup.reducer';
import { SIGNUP_FEATURE_SELECTOR_KEY } from '../constants/signup.constant';

export const selectSignupState = createFeatureSelector<SignupState>(
  SIGNUP_FEATURE_SELECTOR_KEY
);
export const selectSignupLoading = createSelector(
  selectSignupState,
  (state) => state.loading
);
export const selectSignupError = createSelector(
  selectSignupState,
  (state) => state.error
);
export const selectSignupMessage = createSelector(
  selectSignupState,
  (state) => state.successMessage
);
export const selectSignupUser = createSelector(
  selectSignupState,
  (state) => state.data
);
