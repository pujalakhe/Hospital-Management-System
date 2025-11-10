import { createReducer, on } from '@ngrx/store';
import * as signupAction from './signup.actions';
import { SignupState } from './signup.state';

export const initialSignupState: SignupState = {
  loading: false,
  data: null,
  error: null,
};

export const signupReducer = createReducer(
  initialSignupState,
  on(signupAction.signup, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  })),
  on(signupAction.signupSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
    error: null,
  })),
  on(signupAction.signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    data: null,
  }))
);
