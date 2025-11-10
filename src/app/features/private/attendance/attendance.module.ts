import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AttendanceListComponent } from './component/attendance-list/attendance-list-component';
import { BaseTableComponent } from '../../../shared/components/tableComponent/base-table-component/base-table-component';
import { TableheaderComponent } from '../../../shared/components/tableComponent/tableheader.component/tableheader.component';
import { ATTENDANCE_LIST_FEATURE_KEY } from './store/attendance-list/attendanceList.constant';
import { attendanceListReducer } from './store/attendance-list/attendanceList.reducer';
import { AttendanceListEffect } from './store/attendance-list/attendanceList.effect';

@NgModule({
  declarations: [
    AttendanceListComponent
  ],
  imports: [
    CommonModule,
    BaseTableComponent,
    TableheaderComponent,
    RouterModule,
    StoreModule.forFeature(ATTENDANCE_LIST_FEATURE_KEY, attendanceListReducer),
    EffectsModule.forFeature([AttendanceListEffect])
  ],
  exports: [AttendanceListComponent]
})
export class AttendanceModule { }