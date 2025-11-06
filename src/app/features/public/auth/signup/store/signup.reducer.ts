import { createReducer, on } from '@ngrx/store';
import * as signupAction from './signup.actions';
import { SignupResponse } from '../models/signup.model';

export interface SignupState {
  loading: boolean;
  successMessage: string | null;
  data: boolean | null;
  error: string | null;
}

export const initialSignupState: SignupState = {
  loading: false,
  successMessage: null,
  data: null,
  error: null,
};

export const signupReducer = createReducer(
  initialSignupState,
  on(signupAction.signup, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
    data: null,
  })),
  on(signupAction.signupSuccess, (state, { message, data }) => ({
    ...state,
    loading: false,
    successMessage: message,
    data: data,
    error: null,
  })),
  on(signupAction.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    successMessage: null,
    data: null,
  }))
);
