import { createReducer, on } from '@ngrx/store';
import * as AttendanceListActions from '../attendance-list/attendanceList.action';
import { AttendanceItem } from '../../models/attendance.model';

export interface AttendanceListState {
  data: AttendanceItem[];
  loading: boolean;
  error: string | null;
}

export const initialState: AttendanceListState = {
  data: [],
  loading: false,
  error: null,
};

export const attendanceListReducer = createReducer(
  initialState,

  on(AttendanceListActions.loadAttendanceList, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AttendanceListActions.loadAttendanceListSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),

  on(AttendanceListActions.loadAttendanceListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
