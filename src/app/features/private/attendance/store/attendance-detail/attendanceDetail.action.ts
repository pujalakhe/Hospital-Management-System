import { createAction, props } from '@ngrx/store';
import { AttendanceDetailRequest, AttendanceResponse } from '../../models/attendance-detail.model';
import {
  LOAD_ATTENDANCE_DETAIL,
  LOAD_ATTENDANCE_DETAIL_SUCCESS,
  LOAD_ATTENDANCE_DETAIL_FAILURE,
  CLEAR_ATTENDANCE_DETAIL,
} from './attendanceDetail.constant';

// Action to load attendance detail
export const loadAttendanceDetail = createAction(
  LOAD_ATTENDANCE_DETAIL,
  props<{ payload: AttendanceDetailRequest }>()
);

// Action for successful load
export const loadAttendanceDetailSuccess = createAction(
  LOAD_ATTENDANCE_DETAIL_SUCCESS,
  props<{ data: AttendanceResponse }>()
);

// Action for failed load
export const loadAttendanceDetailFailure = createAction(
  LOAD_ATTENDANCE_DETAIL_FAILURE,
  props<{ error: string }>()
);

// Action to clear attendance detail from store
export const clearAttendanceDetail = createAction(CLEAR_ATTENDANCE_DETAIL);
