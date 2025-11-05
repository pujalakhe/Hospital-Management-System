import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.action';

export interface LoginState {
  token: string | null;
  role: string | null;
  employeeId: number | null;
  loading: boolean;
  error: string | null;
}

export const initialState: LoginState = {
  token: null,
  role: null,
  employeeId: null,
  loading: false,
  error: null,
};

export const loginReducer = createReducer(
  initialState,

  on(LoginActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(LoginActions.loginSuccess, (state, { response }) => ({
    ...state,
    token: response.data.token,
    employeeId: response.data.employeeId,
    role: response.data.role,
    loading: false,
    error: null,
  })),

  on(LoginActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(LoginActions.logout, (state) => ({
    ...state,
    token: null,
    role: null,
    employeeId: null,
    loading: false,
    error: null,
  }))
);
