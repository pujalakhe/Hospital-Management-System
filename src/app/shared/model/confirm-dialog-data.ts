import { DialogActions } from '../constants/dialog.constants';

export interface ConfirmDialogData {
  title: string;
  message: string;
  action: DialogActions;
  cancelBtn: DialogActions;
}
