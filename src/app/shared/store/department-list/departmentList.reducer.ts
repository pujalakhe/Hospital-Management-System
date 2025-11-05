import { createReducer, on } from '@ngrx/store';
import * as DepartmentActions from './departmentList.action';
import { Department } from '../../model/department.model';

export interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: any;
}

export const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
};

export const departmentReducer = createReducer(
  initialState,

  on(DepartmentActions.loadDepartments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DepartmentActions.loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    loading: false,
    departments,
  })),

  on(DepartmentActions.loadDepartmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
