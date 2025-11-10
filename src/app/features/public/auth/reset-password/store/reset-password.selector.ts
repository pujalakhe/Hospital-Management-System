import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RESET_PASSWORD_FEATURE_SELECTOR_KEY } from './reset-password.constant';
import { ResetPasswordState, initialState } from './reset-password.reducer';

export const selectResetPasswordState =
  createFeatureSelector<ResetPasswordState>(RESET_PASSWORD_FEATURE_SELECTOR_KEY);

export const selectSendOTPLoading = createSelector(
  selectResetPasswordState,
  (state) => state?.sendOTPLoading ?? initialState.sendOTPLoading
);

export const selectSendOTPSuccess = createSelector(
  selectResetPasswordState,
  (state) => state?.sendOTPSuccess ?? initialState.sendOTPSuccess
);

export const selectResetPasswordLoading = createSelector(
  selectResetPasswordState,
  (state) => state?.resetPasswordLoading ?? initialState.resetPasswordLoading
);

export const selectResetPasswordSuccess = createSelector(
  selectResetPasswordState,
  (state) => state?.resetPasswordSuccess ?? initialState.resetPasswordSuccess
);

export const selectError = createSelector(
  selectResetPasswordState,
  (state) => state?.error ?? initialState.error
);

