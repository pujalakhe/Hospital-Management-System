import { createFeatureSelector, createSelector } from '@ngrx/store';
import { resetPasswordFeatureKey, ResetPasswordState } from './reset-password.state';

// Base selector
export const selectResetPasswordState = createFeatureSelector<ResetPasswordState>(resetPasswordFeatureKey);

// Email and OTP
export const selectEmail = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.email
);

export const selectOTP = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.otp
);

// Loading States
export const selectSendOTPLoading = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.loading.sendOTP
);

export const selectVerifyOTPLoading = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.loading.verifyOTP
);

export const selectResetPasswordLoading = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.loading.resetPassword
);

// Error States
export const selectSendOTPError = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.error.sendOTP
);

export const selectVerifyOTPError = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.error.verifyOTP
);

export const selectResetPasswordError = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.error.resetPassword
);

// Success States
export const selectSendOTPSuccess = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.success.sendOTP
);

export const selectVerifyOTPSuccess = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.success.verifyOTP
);

export const selectResetPasswordSuccess = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.success.resetPassword
);

// OTP Timer
export const selectOTPTimer = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.otpTimer
);

export const selectCanResendOTP = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => state.canResendOTP
);

// Combined Selectors
export const selectResetPasswordUI = createSelector(
  selectResetPasswordState,
  (state: ResetPasswordState) => ({
    email: state.email,
    otp: state.otp,
    loading: state.loading,
    error: state.error,
    success: state.success,
    otpTimer: state.otpTimer,
    canResendOTP: state.canResendOTP
  })
);