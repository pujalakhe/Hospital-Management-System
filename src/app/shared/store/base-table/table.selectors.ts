import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BaseTableState } from '../../model/table-column.model';
import { BASE_TABLE_FEATURE_KEY } from './table.constants';

export const selectBaseTableState = createFeatureSelector<BaseTableState>(BASE_TABLE_FEATURE_KEY);

export const selectBaseTableItems = createSelector(
  selectBaseTableState,
  (state) => state.items
);

export const selectBaseTableTotal = createSelector(
  selectBaseTableState,
  (state) => state.total
);

export const selectBaseTableLoading = createSelector(
  selectBaseTableState,
  (state) => state.loading
);

export const selectBaseTableRequest = createSelector(
  selectBaseTableState,
  (state) => ({
    page: state.page,
    pageSize: state.pageSize,
    sort: state.sort,
    endpoint: state.lastRequest?.endpoint
  })
);
