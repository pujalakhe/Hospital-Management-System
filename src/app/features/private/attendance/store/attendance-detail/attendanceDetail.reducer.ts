import { createReducer, on } from '@ngrx/store';
import * as AttendanceDetailActions from './attendanceDetail.action';
import { AttendanceResponse } from '../../models/attendance-detail.model';

export interface AttendanceDetailState {
  data: AttendanceResponse | null;
  loading: boolean;
  error: any;
}

export const initialState: AttendanceDetailState = {
  data: null,
  loading: false,
  error: null,
};

export const attendanceDetailReducer = createReducer(
  initialState,

  on(AttendanceDetailActions.loadAttendanceDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AttendanceDetailActions.loadAttendanceDetailSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),

  on(AttendanceDetailActions.loadAttendanceDetailFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(AttendanceDetailActions.clearAttendanceDetail, () => initialState)
);
