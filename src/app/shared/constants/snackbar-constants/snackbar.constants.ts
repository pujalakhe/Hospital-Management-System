export const SNACKBAR_DURATION = {
  SHORT: 2500,
  MEDIUM: 4000,
  LONG: 5000,
} as const;
export const SNACKBAR_POSITION = {
  HORIZONTAL: 'right' as const,
  VERTICAL: 'top' as const,
};
export const SNACKBAR_TYPE = {
  SUCCESS: 'success' as const,
  ERROR: 'error' as const,
  INFO: 'info' as const,
  WARNING: 'warning' as const,
};
export const SNACKBAR_ACTION = {
  CLOSE: 'Close' as const,
  UNDO: 'Undo' as const,
};
export type SnackbarType = 'success' | 'error' | 'info' | 'warning';
export type SnackbarAction = 'Close' | 'Undo';
