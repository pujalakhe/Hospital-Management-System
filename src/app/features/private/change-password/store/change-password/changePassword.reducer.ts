import { createReducer, on } from '@ngrx/store';
import * as ChangePasswordActions from './changePassword.action';

export interface ChangePasswordState {
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

export const initialState: ChangePasswordState = {
  isLoading: false,
  successMessage: null,
  errorMessage: null,
};

export const changePasswordReducer = createReducer(
  initialState,

  on(ChangePasswordActions.changePassword, (state) => ({
    ...state,
    isLoading: true,
    successMessage: null,
    errorMessage: null,
  })),

  on(ChangePasswordActions.changePasswordSuccess, (state, { response }) => ({
    ...state,
    isLoading: false,
    successMessage: response.message,
    errorMessage: null,
  })),

  on(ChangePasswordActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    successMessage: null,
    errorMessage: error,
  }))
);
