import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleState } from './roleList.reducer';
import { ROLE_FEATURE_SELECTOR_KEY } from './roleList.constant';

export const selectRoleState = createFeatureSelector<RoleState>(
  ROLE_FEATURE_SELECTOR_KEY
);

export const selectAllRole = createSelector(
  selectRoleState,
  (state) => state.roles
);

export const selectRoleLoading = createSelector(
  selectRoleState,
  (state) => state.loading
);

export const selectRoleError = createSelector(
  selectRoleState,
  (state) => state.error
);
