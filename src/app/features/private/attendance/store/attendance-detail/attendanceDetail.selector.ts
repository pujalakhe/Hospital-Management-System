import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttendanceDetailState } from './attendanceDetail.reducer';
import { ATTENDANCE_DETAIL_FEATURE_SELECTOR_KEY } from './attendanceDetail.constant';
import { AttendanceResponse, AttendanceStatus } from '../../models/attendance-detail.model';

export const selectAttendanceDetailState =
  createFeatureSelector<AttendanceDetailState>(ATTENDANCE_DETAIL_FEATURE_SELECTOR_KEY);

export const selectAttendanceDetailData = createSelector(
  selectAttendanceDetailState,
  (state) => state.data
);

export const selectAttendanceDetailLoading = createSelector(
  selectAttendanceDetailState,
  (state) => state.loading
);

export const selectAttendanceDetailError = createSelector(
  selectAttendanceDetailState,
  (state) => state.error
);

export const selectAttendanceDetailItem = createSelector(
  selectAttendanceDetailData,
  (response: AttendanceResponse | null) => {
    if (!response?.data) return null;

    const item = response.data;

    return {
      employeeId: item.employeeId,
      employeeName: item.employeeName,
      departmentName: item.departmentName,
      date: item.checkIn,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      totalHours: item.workingHour,
      workLocation: item.workLocation,
      checkInReason: item.checkInReason,
      checkOutReason: item.checkOutReason,
      status: item.workingHour > 0 ? 'Present' as AttendanceStatus : 'Absent' as AttendanceStatus
    };
  }
);

