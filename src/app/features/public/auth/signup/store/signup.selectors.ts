import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignupState } from './signup.state';
import { SIGNUP_FEATURE_SELECTOR_KEY } from '../store/signup.constants';

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
export const selectSignupUser = createSelector(
  selectSignupState,
  (state) => state.data
);
