import { createAction, props } from '@ngrx/store';
import { SignupRequest, SignupResponse } from '../models/signup.model';
import {
  SIGNUP,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from '../store/signup.constants';

export const signup = createAction(SIGNUP, props<{ payload: SignupRequest }>());
export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ data: SignupResponse }>()
);
export const signupFailure = createAction(
  SIGNUP_ERROR,
  props<{ error: string }>()
);
