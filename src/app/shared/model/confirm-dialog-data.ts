import { DialogActions } from '../constants/dialog.constant';

export interface ConfirmDialogData {
  title: string;
  message: string;
  action: DialogActions;
  cancelBtn: DialogActions;
}
