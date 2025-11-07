import { Component } from '@angular/core';
import { AuthService } from '../../../../../core/service/auth-service/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_WIDTH } from '../../../../../shared/constants/dialog.constants';
import { CheckInCheckOutDialogBoxComponent } from '../../../check-in-check-out/components/check-in-check-out-dialog-box-component/check-in-check-out-dialog-box-component';

@Component({
  selector: 'app-dashboard-component',
  standalone: false,
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {
  constructor(private dialog: MatDialog) {}
  openCheckInDialogBox() {
    this.dialog.open(CheckInCheckOutDialogBoxComponent, {
      width: DIALOG_WIDTH,
    });
  }
}
