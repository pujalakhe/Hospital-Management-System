import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from './login.constant';

export const login = createAction(
  LOGIN,
  props<{ credentials: LoginRequest }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ response: LoginResponse }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(LOGOUT);
