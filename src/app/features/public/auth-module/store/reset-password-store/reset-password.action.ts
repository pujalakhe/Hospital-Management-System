import { createAction, props } from '@ngrx/store';

// Send OTP
export const sendOTP = createAction(
  '[Reset Password] Send OTP',
  props<{ email: string;}>()
);

export const sendOTPSuccess = createAction(
  '[Reset Password] Send OTP Success',
  props<{ message: string;
    email: string;
  }>()
);

export const sendOTPFailure = createAction(
  '[Reset Password] Send OTP Failure',
  props<{ error: string }>()
);

// Resend OTP
export const resendOTP = createAction(
  '[Reset Password] Resend OTP'
);

// Verify OTP
export const verifyOTP = createAction(
  '[Reset Password] Verify OTP',
  props<{ otp: string }>()
);

export const verifyOTPSuccess = createAction(
  '[Reset Password] Verify OTP Success'
);

export const verifyOTPFailure = createAction(
  '[Reset Password] Verify OTP Failure',
  props<{ error: string }>()
);

// Reset Password
export const resetPassword = createAction(
  '[Reset Password] Reset Password',
  props<{ email: string; newPassword: string; otp: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Reset Password] Reset Password Success',
  props<{ message: string }>()
);

export const resetPasswordFailure = createAction(
  '[Reset Password] Reset Password Failure',
  props<{ error: string }>()
);

// OTP Timer
export const startOTPTimer = createAction(
  '[Reset Password] Start OTP Timer'
);

export const decrementOTPTimer = createAction(
  '[Reset Password] Decrement OTP Timer'
);

export const stopOTPTimer = createAction(
  '[Reset Password] Stop OTP Timer'
);

// Navigation
export const setCurrentStep = createAction(
  '[Reset Password] Set Current Step',
  props<{ step: number }>()
);

export const nextStep = createAction(
  '[Reset Password] Next Step'
);

export const previousStep = createAction(
  '[Reset Password] Previous Step'
);

// Reset
export const resetState = createAction(
  '[Reset Password] Reset State'
);

export const clearErrors = createAction(
  '[Reset Password] Clear Errors'
);