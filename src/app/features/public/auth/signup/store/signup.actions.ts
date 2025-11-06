import { createAction, props } from '@ngrx/store';
import { SignupRequest } from '../models/signup.model';

export const signup = createAction(
  '[signup component] signup',
  props<{ payload: SignupRequest }>()
);
export const signupSuccess = createAction(
  '[signup component] signup',
  props<{ message: string; data: boolean }>()
);
export const signupFailure = createAction(
  '[signup component] signup',
  props<{ error: string }>()
);
