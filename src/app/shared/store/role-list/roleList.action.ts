import { createAction, props } from '@ngrx/store';
import {
  LOAD_ROLE,
  LOAD_ROLE_FAILURE,
  LOAD_ROLE_SUCCESS,
} from './roleList.constant';
import { Role } from '../../model/role.model';

export const loadRole = createAction(LOAD_ROLE);

export const loadRoleSuccess = createAction(
  LOAD_ROLE_SUCCESS,
  props<{ roles: Role[] }>()
);

export const loadRoleFailure = createAction(
  LOAD_ROLE_FAILURE,
  props<{ error: any }>()
);
