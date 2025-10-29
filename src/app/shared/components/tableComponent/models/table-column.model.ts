type ColumnType = 'text' | 'custom' | 'action' | undefined;

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_DIALOG_WIDTH = 500;
export const EMPTY_FILTER = '';
export const LOWERCASE = (val: any): string =>
  val?.toString().trim().toLowerCase() ?? '';

export const SORT_DIRECTION_ASC = 'asc' as const;
export const SORT_DIRECTION_DESC = 'desc' as const;

export type SortDirection = typeof SORT_DIRECTION_ASC | typeof SORT_DIRECTION_DESC;

export interface TableColumn<T> {
  field: keyof T | string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ value: any; label: string }>;
  filterEndpoint?: string;
  type?: ColumnType;
}

export interface BaseTableState {
  items: any[];
  total: number;
  loading: boolean;
  error: any;
  page: number;
  pageSize: number;
  sort: { field: string; direction: SortDirection } | null;
  lastRequest: BaseTableRequest | null;
}

export interface BaseTableRequest {
  page: number;
  pageSize: number;
  sort?: { field: string; direction: SortDirection } | null;
  endpoint?: string;
}

export interface BaseTableResponse<T> {
  total: number;
  items: T[];
}
