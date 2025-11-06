import { createAction, props } from '@ngrx/store';
import {
  LOAD_DEPARTMENT,
  LOAD_DEPARTMENT_FAILURE,
  LOAD_DEPARTMENT_SUCCESS,
} from './departmentList.constant';
import { Department } from '../../model/department.model';

export const loadDepartments = createAction(LOAD_DEPARTMENT);

export const loadDepartmentsSuccess = createAction(
  LOAD_DEPARTMENT_SUCCESS,
  props<{ departments: Department[] }>()
);

export const loadDepartmentsFailure = createAction(
  LOAD_DEPARTMENT_FAILURE,
  props<{ error: any }>()
);
