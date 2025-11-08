import { createReducer, on } from '@ngrx/store';
import * as ResetPasswordActions from './reset-password.action';

export interface ResetPasswordState {
  sendOTPLoading: boolean;
  sendOTPSuccess: boolean;
  resetPasswordLoading: boolean;
  resetPasswordSuccess: boolean;
  error: string | null;
}

export const initialState: ResetPasswordState = {
  sendOTPLoading: false,
  sendOTPSuccess: false,
  resetPasswordLoading: false,
  resetPasswordSuccess: false,
  error: null,
};

export const resetPasswordReducer = createReducer(
  initialState,

  // Request OTP
  on(ResetPasswordActions.requestOtp, (state) => ({
    ...state,
    sendOTPLoading: true,
    sendOTPSuccess: false,
    error: null,
  })),

  on(ResetPasswordActions.requestOtpSuccess, (state) => ({
    ...state,
    sendOTPLoading: false,
    sendOTPSuccess: true,
  })),

  on(ResetPasswordActions.requestOtpFailure, (state, { error }) => ({
    ...state,
    sendOTPLoading: false,
    sendOTPSuccess: false,
    error,
  })),

  // Reset Password
  on(ResetPasswordActions.resetPassword, (state) => ({
    ...state,
    resetPasswordLoading: true,
    resetPasswordSuccess: false,
    error: null,
  })),

  on(ResetPasswordActions.resetPasswordSuccess, (state) => ({
    ...state,
    resetPasswordLoading: false,
    resetPasswordSuccess: true,
  })),

  on(ResetPasswordActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    resetPasswordLoading: false,
    resetPasswordSuccess: false,
    error,
  }))
);

