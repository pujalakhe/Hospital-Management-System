export enum DialogActions {
  Delete = 'delete',
  Update = 'update',
  Add = 'add',
  Cancel = 'cancel',
  Leave = 'leave',
  Stay = 'stay',
}

export const DIALOG_WIDTH = '350px' as const;

export const UNSAVED_CHANGE_MESSAGE =
  'You have unsaved changes.Are you sure you want to leave?';
