import { createAction, props } from '@ngrx/store';
import { BaseTableRequest, BaseTableResponse, SortDirection } from '../models/table-column.model';
import { LOAD_BASE_TABLE, LOAD_BASE_TABLE_FAILURE, LOAD_BASE_TABLE_SUCCESS, SET_BASE_TABLE_PAGE, SET_BASE_TABLE_SORT } from './models/table.constants';


export const loadBaseTable = createAction(
  LOAD_BASE_TABLE,
  props<{ request: BaseTableRequest }>()
);

export const loadBaseTableSuccess = createAction(
  LOAD_BASE_TABLE_SUCCESS,
  props<{ response: BaseTableResponse<any>; request: BaseTableRequest }>()
);

export const loadBaseTableFailure = createAction(
  LOAD_BASE_TABLE_FAILURE,
  props<{ error: any }>()
);

export const setBaseTableSort = createAction(
  SET_BASE_TABLE_SORT,
  props<{ sort: { field: string; direction: SortDirection } | null }>()
);

export const setBaseTablePage = createAction(
  SET_BASE_TABLE_PAGE,
  props<{ page: number; pageSize?: number }>()
);
