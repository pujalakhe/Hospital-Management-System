import { createAction, props } from '@ngrx/store';
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
} from './changePassword.constant';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '../../model/changePassword.model';

export const changePassword = createAction(
  CHANGE_PASSWORD,
  props<{
    credentials: ChangePasswordRequest;
  }>()
);

export const changePasswordSuccess = createAction(
  CHANGE_PASSWORD_SUCCESS,
  props<{ response: ChangePasswordResponse }>()
);

export const changePasswordFailure = createAction(
  CHANGE_PASSWORD_FAILURE,
  props<{ error: string }>()
);
