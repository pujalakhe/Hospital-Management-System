import { createReducer, on } from '@ngrx/store';

import {
  checkInFailure,
  checkInRequest,
  checkInSuccess,
  checkOutFailure,
  checkOutRequest,
  checkOutSuccess,
} from './check-in-check-out.actions';

export interface AttendanceState {
  loading: boolean;
  checkInStatus: boolean | null;
  error: string | null;
}

export const initialState: AttendanceState = {
  loading: false,
  checkInStatus: false,
  error: null,
};
export const checkInCheckOutReducer = createReducer(
  initialState,
  //check in
  on(checkInRequest, (state) => ({ ...state, loading: true, error: null })),
  on(
    checkInSuccess,
    (state, { response }): AttendanceState => ({
      loading: false,
      checkInStatus: true,
      error: null,
    })
  ),
  on(checkInFailure, (state, { error }) => ({
    ...state,
    error,
    checkInStatus: false,
    loading: false,
  })),

  // Check Out
  on(checkOutRequest, (state) => ({ ...state, loading: true, error: null })),
  on(
    checkOutSuccess,
    (state, { response }): AttendanceState => ({
      loading: false,
      checkInStatus: false,
      error: null,
    })
  ),
  on(checkOutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    checkInStatus: true,
    error,
  }))
);
