import { createAction, props } from '@ngrx/store';
import { SignupRequest } from '../models/signup.model';
import {
  SIGNUP,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from '../constants/signup.constant';

export const signup = createAction(SIGNUP, props<{ payload: SignupRequest }>());
export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ message: string; data: boolean }>()
);
export const signupFailure = createAction(
  SIGNUP_ERROR,
  props<{ error: string }>()
);
