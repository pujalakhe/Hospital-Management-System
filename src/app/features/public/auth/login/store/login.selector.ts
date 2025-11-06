import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_FEATURE_SELECTOR_KEY } from './login.constant';
import { LoginState } from './login.reducer';

export const selectLoginState = createFeatureSelector<LoginState>(
  LOGIN_FEATURE_SELECTOR_KEY
);

export const selectToken = createSelector(selectLoginState, (s) => s.token);
export const selectEmployeeId = createSelector(
  selectLoginState,
  (s) => s.employeeId
);
export const selectRole = createSelector(selectLoginState, (s) => s.role);
export const selectLoading = createSelector(selectLoginState, (s) => s.loading);
export const selectError = createSelector(selectLoginState, (s) => s.error);
