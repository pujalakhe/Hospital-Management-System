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

export const selectSendOTPSuccess = createSelector(
  selectResetPasswordState,
  (state) => state.sendOTPSuccess
);

export const selectResetPasswordSuccess = createSelector(
  selectResetPasswordState,
  (state) => state.resetPasswordSuccess
);
