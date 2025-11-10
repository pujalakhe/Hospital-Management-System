export type ColumnType = 'text' | 'custom' | 'action' | undefined;

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_TOTAL = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_DIALOG_WIDTH = 500;
export const EMPTY_FILTER = '';
export const LOWERCASE = (val: any): string =>
  val?.toString().trim().toLowerCase() ?? '';

export const SORT_DIRECTION_ASC = 'asc' as const;
export const SORT_DIRECTION_DESC = 'desc' as const;

export type SortDirection = typeof SORT_DIRECTION_ASC | typeof SORT_DIRECTION_DESC;