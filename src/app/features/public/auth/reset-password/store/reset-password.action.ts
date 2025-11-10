import { createAction, props } from '@ngrx/store';
import { RequestOtpRequest, ResetPasswordRequest } from '../model/reset-password.model';
import {
  REQUEST_OTP,
  REQUEST_OTP_FAILURE,
  REQUEST_OTP_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
} from './reset-password.constant';

export const requestOtp = createAction(
  REQUEST_OTP,
  props<{ payload: RequestOtpRequest }>()
);

export const requestOtpSuccess = createAction(REQUEST_OTP_SUCCESS);

export const requestOtpFailure = createAction(
  REQUEST_OTP_FAILURE,
  props<{ error: string }>()
);

export const resetPassword = createAction(
  RESET_PASSWORD,
  props<{ payload: ResetPasswordRequest }>()
);

export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);

export const resetPasswordFailure = createAction(
  RESET_PASSWORD_FAILURE,
  props<{ error: string }>()
);

