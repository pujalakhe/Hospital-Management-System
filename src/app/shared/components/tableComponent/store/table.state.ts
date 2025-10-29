import { BaseTableState } from "../models/table-column.model";


export const initialState: BaseTableState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  sort: null,
  lastRequest: null
};
