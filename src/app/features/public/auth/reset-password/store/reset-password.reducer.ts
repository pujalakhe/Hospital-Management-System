import { createReducer, on } from '@ngrx/store';
import * as ResetPasswordActions from './reset-password.action';

export interface ResetPasswordState {
  sendOTPLoading: boolean;
  verifyOTPLoading: boolean;
  resetPasswordLoading: boolean;
  success: boolean;
  error?: string | null;
}

export const initialState: ResetPasswordState = {
  sendOTPLoading: false,
  verifyOTPLoading: false,
  resetPasswordLoading: false,
  success: false,
  error: null,
};

export const resetPasswordReducer = createReducer(
  initialState,
  on(ResetPasswordActions.requestOtp, (state) => ({
    ...state,
    sendOTPLoading: true,
    error: null
  })),
  on(ResetPasswordActions.requestOtpSuccess, (state) => ({
    ...state,
    sendOTPLoading: false
  })),
  on(ResetPasswordActions.requestOtpFailure, (state, { error }) => ({
    ...state,
    sendOTPLoading: false,
    error
  })),

  

  on(ResetPasswordActions.resetPassword, (state) => ({
    ...state,
    resetPasswordLoading: true,
    error: null
  })),
  on(ResetPasswordActions.resetPasswordSuccess, (state) => ({
    ...state,
    resetPasswordLoading: false,
    success: true
  })),
  on(ResetPasswordActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    resetPasswordLoading: false,
    error
  }))
);
