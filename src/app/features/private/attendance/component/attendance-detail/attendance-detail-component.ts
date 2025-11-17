import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as AttendanceDetailActions from '../../store/attendance-detail/attendanceDetail.action';
import * as AttendanceDetailSelectors from '../../store/attendance-detail/attendanceDetail.selector';
import { AttendanceDetail, AttendanceDetailRequest } from '../../models/attendance-detail.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-detail',
  standalone: false,
  templateUrl: './attendance-detail-component.html',
  styleUrls: ['./attendance-detail-component.scss']
})
export class AttendanceDetailComponent implements OnInit {

  detail$!: Observable<AttendanceDetail | null>;
loading$!: Observable<boolean>;
error$!: Observable<string | null>;


 constructor(
  @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
  private dialogRef: MatDialogRef<AttendanceDetailComponent>,
  private store: Store
) {
  this.detail$ = this.store.select(AttendanceDetailSelectors.selectAttendanceDetailItem);
  this.loading$ = this.store.select(AttendanceDetailSelectors.selectAttendanceDetailLoading);
  this.error$ = this.store.select(AttendanceDetailSelectors.selectAttendanceDetailError);
}


  ngOnInit(): void {
    if (!this.data?.employeeId) {
      console.error('No employee ID provided');
      return;
    }

    const payload: AttendanceDetailRequest = {
      employeeId: this.data.employeeId
    };

    this.store.dispatch(AttendanceDetailActions.loadAttendanceDetail({ payload }));
  }

  close(): void {
    this.store.dispatch(AttendanceDetailActions.clearAttendanceDetail());
    this.dialogRef.close();
  }
}
