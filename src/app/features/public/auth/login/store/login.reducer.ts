import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './login.action';

export interface LoginState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: LoginState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null,
    loading: false,
    error: null,
  }))
);
