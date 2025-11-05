// In your reducer file
import { createReducer, on } from '@ngrx/store';
import * as ResetPasswordActions from './reset-password.action';
import { ResetPasswordState, initialState } from './reset-password.state';

export const resetPasswordReducer = createReducer(
  initialState,
  
  // Send OTP
  on(ResetPasswordActions.sendOTP, (state) => ({
    ...state,
    loading: { ...state.loading, sendOTP: true },
    error: { ...state.error, sendOTP: null },
    success: { ...state.success, sendOTP: false }
  })),
 // In reset-password.reducer.ts
on(ResetPasswordActions.sendOTPSuccess, (state, { email, message }) => ({
  ...state,
  email,  // Update the email in the state
  loading: { ...state.loading, sendOTP: false },
  success: { ...state.success, sendOTP: true },
  canResendOTP: false,
  otpTimer: 30  // Start the OTP timer
})),
  on(ResetPasswordActions.sendOTPFailure, (state, { error }) => ({
    ...state,
    loading: { ...state.loading, sendOTP: false },
    error: { ...state.error, sendOTP: error }
  })),

  // Verify OTP
  on(ResetPasswordActions.verifyOTP, (state) => ({
    ...state,
    loading: { ...state.loading, verifyOTP: true },
    error: { ...state.error, verifyOTP: null },
    success: { ...state.success, verifyOTP: false }
  })),
  on(ResetPasswordActions.verifyOTPSuccess, (state) => ({
    ...state,
    loading: { ...state.loading, verifyOTP: false },
    success: { ...state.success, verifyOTP: true }
  })),
  on(ResetPasswordActions.verifyOTPFailure, (state, { error }) => ({
    ...state,
    loading: { ...state.loading, verifyOTP: false },
    error: { ...state.error, verifyOTP: error }
  })),

  // Reset Password
  on(ResetPasswordActions.resetPassword, (state) => ({
    ...state,
    loading: { ...state.loading, resetPassword: true },
    error: { ...state.error, resetPassword: null },
    success: { ...state.success, resetPassword: false }
  })),
  on(ResetPasswordActions.resetPasswordSuccess, (state) => ({
    ...state,
    loading: { ...state.loading, resetPassword: false },
    success: { ...state.success, resetPassword: true }
  })),
  on(ResetPasswordActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    loading: { ...state.loading, resetPassword: false },
    error: { ...state.error, resetPassword: error }
  })),

  // Timer
  on(ResetPasswordActions.startOTPTimer, (state) => ({
    ...state,
    otpTimer: 30,
    canResendOTP: false
  })),
  on(ResetPasswordActions.decrementOTPTimer, (state) => ({
    ...state,
    otpTimer: state.otpTimer > 0 ? state.otpTimer - 1 : 0,
    canResendOTP: state.otpTimer <= 1
  })),
  on(ResetPasswordActions.stopOTPTimer, (state) => ({
    ...state,
    otpTimer: 0,
    canResendOTP: true
  }))
);

export function reducer(state: ResetPasswordState | undefined, action: any) {
  return resetPasswordReducer(state, action);
}