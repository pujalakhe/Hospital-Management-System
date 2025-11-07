import { createReducer, on } from '@ngrx/store';
import { CheckInResponse } from '../../model/check-in-check-out-model';
import {
  checkInFailure,
  checkInRequest,
  checkInSuccess,
} from '../check-in-check-out.actions';

export interface CheckInState {
  loading: boolean;
  response: CheckInResponse | null;
  error: string | null;
}

export const initialState: CheckInState = {
  loading: false,
  response: null,
  error: null,
};
export const checkInReducer = createReducer(
  initialState,
  on(checkInRequest, (state) => ({ ...state, loading: true, error: null })),
  on(checkInSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    response,
    error: null,
  })),
  on(checkInFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
