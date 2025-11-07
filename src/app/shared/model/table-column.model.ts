import { ColumnType, SortDirection } from "../components/tableComponent/constants/basetable.constant";

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
