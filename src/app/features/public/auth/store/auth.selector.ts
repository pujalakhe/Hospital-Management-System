import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_SELECTOR_KEY } from './auth.constant';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(
  AUTH_FEATURE_SELECTOR_KEY
);
export const selectUser = createSelector(selectAuthState, (s) => s.user);
export const selectToken = createSelector(selectAuthState, (s) => s.token);
export const selectLoading = createSelector(selectAuthState, (s) => s.loading);
export const selectError = createSelector(selectAuthState, (s) => s.error);
