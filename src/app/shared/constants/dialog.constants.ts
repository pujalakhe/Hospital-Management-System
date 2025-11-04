export enum DialogActions {
  Delete = 'delete',
  Update = 'update',
  Add = 'add',
  Cancel = 'cancel',
  Leave = 'leave',
  Stay = 'stay',
}

export const DIALOG_WIDTH = '350px' as const;

export const GENERIC_CONFIRM = {
  TITLE: 'Please Confirm',
  MESSAGE: 'Are you sure you want to continue?',
};

export const ADD_CONFIRM = {
  TITLE: 'Confirm ADD',
  MESSAGE: 'Are you sure you want to add this item?',
};

export const UPDATE_CONFIRM = {
  TITLE: 'Confirm Update',
  MESSAGE: 'Do you want to save these changes?',
};

export const DELETE_CONFIRM = {
  TITLE: 'Confirm Delete',
  MESSAGE: 'Are you sure you want to delete this item?',
};

export const UNSAVED_CHANGES = {
  TITLE: 'Unsaved Changes',
  MESSAGE: 'You have unsaved changes. Leave this page?',
};
