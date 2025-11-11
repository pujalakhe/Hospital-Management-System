import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/service/auth-service/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_WIDTH } from '../../../../../shared/constants/dialog.constants';
import { CheckInCheckOutDialogBoxComponent } from '../../../check-in-check-out/components/check-in-check-out-dialog-box-component/check-in-check-out-dialog-box-component';
import { selectCheckedInStatus } from '../../../check-in-check-out/store/check-in-check-out.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-component',
  standalone: false,
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent implements OnInit {
  checkInStatus$?: Observable<boolean>;
  constructor(private dialog: MatDialog, private store: Store) {}

  todoList: { title: string; description: string }[] = [
    {
      title: 'Complete onboarding document upload',
      description: ' This is a summary of the content',
    },
    {
      title: 'Follow up on clients',
      description: ' This is a summary of the content',
    },
    {
      title: 'Design wireframe for LMS',
      description: ' This is a summary of the content',
    },
  ];

  displayedColumns: string[] = ['earning', 'amount', 'deduction', 'total'];

  paySlip = [
    { earning: 'Basic Wage', amount: 150000, deduction: -30000, total: 120000 },
    { earning: 'Tax', amount: 15000, deduction: -3000, total: 12000 },
    { earning: 'Pension', amount: 15000, deduction: -3000, total: 12000 },
  ];

  ngOnInit() {
    this.checkInStatus$ = this.store.select(selectCheckedInStatus);
  }

  openCheckInDialogBox() {
    this.dialog.open(CheckInCheckOutDialogBoxComponent, {
      width: DIALOG_WIDTH,
      disableClose: true,
    });
  }
}
