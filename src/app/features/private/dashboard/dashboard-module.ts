import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { MaterialModule } from '../../../shared/angular-material.module';
import { AttendanceModule } from '../attendance/attendance.module';

@NgModule({
  declarations: [Dashboard],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, AttendanceModule],
})
export class DashboardModule {}
