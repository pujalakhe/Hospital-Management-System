import { createAction, props } from '@ngrx/store';

export const requestOtp = createAction(
  '[Reset Password] Request OTP',
  props<{ email: string }>()
);

export const requestOtpSuccess = createAction(
  '[Reset Password] Request OTP Success'
);

export const requestOtpFailure = createAction(
  '[Reset Password] Request OTP Failure',
  props<{ error: string }>()
);


export const resetPassword = createAction(
  '[Reset Password] Reset Password',
  props<{ email: string; otp: string; newPassword: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Reset Password] Reset Password Success'
);

export const resetPasswordFailure = createAction(
  '[Reset Password] Reset Password Failure',
  props<{ error: string }>()
);
