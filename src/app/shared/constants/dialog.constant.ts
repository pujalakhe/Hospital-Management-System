export const DIALOG_ACTIONS = {
  DELETE: 'delete',
  UPDATE: 'update',
  ADD: 'add',
} as const;

export const DIALOG_WIDTH = {
  width: '350px',
};

export const DIALOG_ACTIONS_COLOR = {
  WARN: 'warn',
  PRIMARY: 'primary',
};

export type DialogAction = (typeof DIALOG_ACTIONS)[keyof typeof DIALOG_ACTIONS];
