import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttendanceListState } from './attendanceList.reducer';
import { ATTENDANCE_LIST_FEATURE_KEY } from './attendanceList.constant';

export const selectAttendanceListState =
  createFeatureSelector<AttendanceListState>(ATTENDANCE_LIST_FEATURE_KEY);

export const selectAttendanceListData = createSelector(
  selectAttendanceListState,
  (state) => state.data
);

export const selectAttendanceListLoading = createSelector(
  selectAttendanceListState,
  (state) => state.loading
);

export const selectAttendanceListError = createSelector(
  selectAttendanceListState,
  (state) => state.error
);
