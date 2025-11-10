import { createReducer, on } from '@ngrx/store';
import * as signupAction from './signup.actions';
import { SignupState } from './signup.state';

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
