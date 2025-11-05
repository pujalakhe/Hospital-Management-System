import { createReducer, on } from '@ngrx/store';
import * as RoleActions from './roleList.action';
import { Role } from '../../model/role.model';

export interface RoleState {
  roles: Role[];
  loading: boolean;
  error: any;
}

export const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

export const roleReducer = createReducer(
  initialState,

  on(RoleActions.loadRole, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(RoleActions.loadRoleSuccess, (state, { roles }) => ({
    ...state,
    loading: false,
    roles,
  })),

  on(RoleActions.loadRoleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
