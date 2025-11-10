import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import * as AttendanceListActions from '../../store/attendance-list/attendanceList.action';
import { AttendanceListRequest } from '../../models/attendance.model';
import {
  selectAttendanceListData,
  selectAttendanceListLoading,
} from '../../store/attendance-list/attendanceList.selector';
import { 
  AttendanceItem, 
  AttendanceStatus,
  AttendanceTableColumn 
} from '../../models/attendance.model';
import { SortDirection } from '../../../../../shared/components/tableComponent/constants/basetable.constant';

@Component({
  selector: 'app-attendance-list-component',
  standalone: false,
  templateUrl: './attendance-list-component.html',
  styleUrl: './attendance-list-component.scss',
})
export class AttendanceListComponent implements OnInit {
  tableTitle = 'Attendance List';
  buttonLabel = 'Add Attendance';

  columns: AttendanceTableColumn[] = [    ];

  rows$: Observable<AttendanceItem[]>;
  loading$: Observable<boolean>;
  total$: Observable<number>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.rows$ = this.store.select(selectAttendanceListData);
    this.loading$ = this.store.select(selectAttendanceListLoading);
    // We'll derive total from the data since it's not directly in the state
    this.total$ = this.store.select(selectAttendanceListData).pipe(
      map(data => data ? data.length : 0)
    );
  }

  ngOnInit(): void {
    this.loadAttendance();
  }

  private currentRequest: AttendanceListRequest = {
    skip: 0,
    take: 10
  };

  loadAttendance(page = 1, pageSize = 10): void {
    this.currentRequest = {
      ...this.currentRequest,
      skip: (page - 1) * pageSize,
      take: pageSize
    };
    this.store.dispatch(
      AttendanceListActions.loadAttendanceList({
        payload: this.currentRequest
      })
    );
  }

  onPageChange(event: { page: number; pageSize?: number }) {
    this.loadAttendance(event.page, event.pageSize ?? 10);
  }

  onSortChange(event: { field: string; direction: SortDirection } | null) {
  if (!event) {
    // If sort is cleared, just reload without sorting
    this.currentRequest = {
      ...this.currentRequest,
      skip: 0,
      sort: undefined,
    };
  } else {
    this.currentRequest = {
      ...this.currentRequest,
      skip: 0,
      sort: { key: event.field, sortBy: event.direction },
    };
  }

  this.store.dispatch(
    AttendanceListActions.loadAttendanceList({
      payload: this.currentRequest,
    })
  );
}


  onFilterChange(filters: Record<string, any>) {
    this.currentRequest = {
      ...this.currentRequest,
      skip: 0,
      ...(filters['employeeId'] && { employeeId: filters['employeeId'] }),
      ...(filters['departmentId'] && { departmentId: filters['departmentId'] }),
      ...(filters['startDate'] && { startDate: filters['startDate'] }),
      ...(filters['endDate'] && { endDate: filters['endDate'] }),
      ...(filters['workLocation'] && { workLocation: filters['workLocation'] })
    };
    this.store.dispatch(
      AttendanceListActions.loadAttendanceList({
        payload: this.currentRequest
      })
    );
  }

  handleAction(event: { action: string; row: AttendanceItem }) {
    switch (event.action) {
      case 'edit':
        // Handle edit action
        break;
      case 'delete':
        // Handle delete action
        break;
      case 'view':
        // Handle view action
        break;
    }
  }

  openAddUserForm() {
    // Implement add attendance form dialog
  }
}
