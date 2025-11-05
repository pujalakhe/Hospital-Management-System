import { createAction, props } from '@ngrx/store';
import { User, UserCredentials } from '../model/login.model';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from './login.constant';

export const login = createAction(
  LOGIN,
  props<{ credentials: UserCredentials }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; token: string }>()
);
export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(LOGOUT);
