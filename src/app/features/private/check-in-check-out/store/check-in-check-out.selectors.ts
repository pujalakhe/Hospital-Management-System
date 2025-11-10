import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttendanceState } from './check-in-check-out.reducer';
import { CHECK_IN_FEATURE_SELECTOR_KEY } from './check-in-check-out.constants';

export const selectAttendanceState = createFeatureSelector<AttendanceState>(
  CHECK_IN_FEATURE_SELECTOR_KEY
);

export const selectLoading = createSelector(
  selectAttendanceState,
  (s) => s.loading
);
export const selectError = createSelector(
  selectAttendanceState,
  (s) => s.error
);

export const selectCheckedInStatus = createSelector(
  selectAttendanceState,
  (state) => state.checkInStatus
);
