export const DIALOG_ACTIONS = {
  DELETE: 'delete',
  UPDATE: 'update',
  ADD: 'add',
} as const;

export const DIALOG_WIDTH = '350px' as const;

export const DIALOG_ACTIONS_COLOR = {
  WARN: 'warn',
  PRIMARY: 'primary',
} as const;

export type DialogAction = (typeof DIALOG_ACTIONS)[keyof typeof DIALOG_ACTIONS];

export const UNSAVED_CHANGE_MESSAGE =
  'You have unsaved changes.Are you sure you want to leave?';
