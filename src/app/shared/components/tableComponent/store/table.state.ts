import { DEFAULT_TOTAL, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../constants/basetable.constant';
import { BaseTableState } from "../../../model/table-column.model";


export const initialState: BaseTableState = {
  items: [],
  total: DEFAULT_TOTAL,
  loading: false,
  error: null,
  page: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_PAGE_SIZE,
  sort: null,
  lastRequest: null
};
