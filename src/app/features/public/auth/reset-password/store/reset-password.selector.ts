import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResetPasswordState } from './reset-password.reducer';

export const selectResetPasswordState =
  createFeatureSelector<ResetPasswordState>('resetPassword');

export const selectSendOTPLoading = createSelector(
  selectResetPasswordState,
  (state) => state.sendOTPLoading
);

export const selectResetPasswordLoading = createSelector(
  selectResetPasswordState,
  (state) => state.resetPasswordLoading
);

export const selectError = createSelector(
  selectResetPasswordState,
  (state) => state.error
);

export const selectSuccess = createSelector(
  selectResetPasswordState,
  (state) => state.success
);
