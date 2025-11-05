import { createAction, props } from '@ngrx/store';

export const changePassword = createAction(
  '[Change Password] Request',
  props<{
    oldPassword: string;
    newPassword: string;
  }>()
);

export const changePasswordSuccess = createAction(
  '[Change Password] Success',
  props<{ message: string }>()
);

export const changePasswordFailure = createAction(
  '[Change Password] Failure',
  props<{ error: string }>()
);
