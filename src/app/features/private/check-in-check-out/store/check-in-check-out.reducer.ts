import { createReducer, on } from '@ngrx/store';
import {
  CheckInResponse,
  CheckOutResponse,
} from '../model/check-in-check-out-model';
import {
  checkInFailure,
  checkInRequest,
  checkInSuccess,
  checkOutFailure,
  checkOutRequest,
  checkOutSuccess,
  loadCheckInStatusFailure,
  loadCheckInStatusRequest,
  loadCheckInStatusSuccess,
} from './check-in-check-out.actions';

export interface AttendanceState {
  loading: boolean;
  checkInResponse: CheckInResponse | null;
  checkOutResponse: CheckOutResponse | null;
  checkInStatus: boolean;
  error: string | null;
}

export const initialState: AttendanceState = {
  loading: false,
  checkInResponse: null,
  checkOutResponse: null,
  checkInStatus: false,
  error: null,
};
export const checkInCheckOutReducer = createReducer(
  initialState,
  //check in
  on(checkInRequest, (state) => ({ ...state, loading: true, error: null })),
  on(checkInSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    checkInResponse: response,
    error: null,
  })),
  on(checkInFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Check Out
  on(checkOutRequest, (state) => ({ ...state, loading: true, error: null })),
  on(checkOutSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    checkOutResponse: response,
  })),
  on(checkOutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Check In Status
  on(loadCheckInStatusRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadCheckInStatusSuccess, (state, { checkInStatus }) => ({
    ...state,
    loading: false,
    checkInStatus,
  })),
  on(loadCheckInStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
