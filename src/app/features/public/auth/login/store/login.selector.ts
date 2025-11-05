import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_FEATURE_SELECTOR_KEY } from './login.constant';
import { LoginState } from './login.reducer';

export const selectAuthState = createFeatureSelector<LoginState>(
  LOGIN_FEATURE_SELECTOR_KEY
);
export const selectUser = createSelector(selectAuthState, (s) => s.user);
export const selectToken = createSelector(selectAuthState, (s) => s.token);
export const selectLoading = createSelector(selectAuthState, (s) => s.loading);
export const selectError = createSelector(selectAuthState, (s) => s.error);
