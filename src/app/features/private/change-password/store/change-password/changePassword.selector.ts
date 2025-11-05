import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChangePasswordState } from './changePassword.reducer';

export const CHANGE_PASSWORD_FEATURE_KEY = 'changePassword';

export const selectChangePasswordState =
  createFeatureSelector<ChangePasswordState>(CHANGE_PASSWORD_FEATURE_KEY);

export const selectIsLoading = createSelector(
  selectChangePasswordState,
  (state) => state.isLoading
);

export const selectSuccessMessage = createSelector(
  selectChangePasswordState,
  (state) => state.successMessage
);

export const selectErrorMessage = createSelector(
  selectChangePasswordState,
  (state) => state.errorMessage
);
