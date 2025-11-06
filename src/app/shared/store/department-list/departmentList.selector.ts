import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentState } from './departmentList.reducer';
import { DEPARTMENT_FEATURE_SELECTOR_KEY } from './departmentList.constant';

export const selectDepartmentState = createFeatureSelector<DepartmentState>(
  DEPARTMENT_FEATURE_SELECTOR_KEY
);

export const selectAllDepartment = createSelector(
  selectDepartmentState,
  (state) => state.departments
);

export const selectDepartmentLoading = createSelector(
  selectDepartmentState,
  (state) => state.loading
);

export const selectDepartmentError = createSelector(
  selectDepartmentState,
  (state) => state.error
);
