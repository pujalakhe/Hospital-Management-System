import { createAction, props } from '@ngrx/store';
import { AttendanceItem, AttendanceListRequest } from '../../models/attendance.model';
import { AttendanceListConstants } from './attendanceList.constant';

export const loadAttendanceList = createAction(
  AttendanceListConstants.LOAD_ATTENDANCE_LIST,
  props<{ payload: AttendanceListRequest }>()
);

export const loadAttendanceListSuccess = createAction(
  AttendanceListConstants.LOAD_ATTENDANCE_LIST_SUCCESS,
  props<{ data: AttendanceItem[] }>()
);

export const loadAttendanceListFailure = createAction(
  AttendanceListConstants.LOAD_ATTENDANCE_LIST_FAILURE,
  props<{ error: any }>()
);
