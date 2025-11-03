export const SNACKBAR_DURATION = {
  SHORT: 2500,
  MEDIUM: 4000,
  LONG: 5000,
} as const;

export const SNACKBAR_POSITION = {
  HORIZONTAL: 'right',
  VERTICAL: 'top',
} as const;

export const SNACKBAR_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

export const SNACKBAR_ACTION = {
  CLOSE: 'Close',
  OK: 'ok',
} as const;
