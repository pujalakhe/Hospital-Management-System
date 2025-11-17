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
import { AttendanceDetailComponent } from './component/attendance-detail/attendance-detail-component';
import { MaterialModule } from '../../../shared/angular-material.module';
import { BASE_TABLE_FEATURE_KEY } from '../../../shared/store/base-table/table.constants';
import { baseTableReducer } from '../../../shared/store/base-table/table.reducer';
import { BaseTableEffects } from '../../../shared/store/base-table/table.effects';
import { AttendanceDetailEffects } from './store/attendance-detail/attendanceDetail.effect';
import { attendanceDetailReducer } from './store/attendance-detail/attendanceDetail.reducer';
import { ATTENDANCE_DETAIL_FEATURE_SELECTOR_KEY } from './store/attendance-detail/attendanceDetail.constant';

@NgModule({
  declarations: [
    AttendanceListComponent,
    AttendanceDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BaseTableComponent,
    TableheaderComponent,
    RouterModule,
    StoreModule.forFeature(ATTENDANCE_LIST_FEATURE_KEY, attendanceListReducer),
    EffectsModule.forFeature([AttendanceListEffect]),
    StoreModule.forFeature(ATTENDANCE_DETAIL_FEATURE_SELECTOR_KEY, attendanceDetailReducer),
    EffectsModule.forFeature([AttendanceDetailEffects]),
    StoreModule.forFeature(BASE_TABLE_FEATURE_KEY, baseTableReducer),
    EffectsModule.forFeature([BaseTableEffects])
  ],
  exports: [AttendanceListComponent]
})
export class AttendanceModule { }