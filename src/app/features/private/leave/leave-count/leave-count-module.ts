import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveCountRoutingModule } from './leave-count-routing-module';
import { LeaveCountListComponent } from './components/leave-count-list-component/leave-count-list-component';
import { MaterialModule } from '../../../../shared/angular-material.module';

@NgModule({
  declarations: [LeaveCountListComponent],
  imports: [CommonModule, LeaveCountRoutingModule, MaterialModule],
})
export class LeaveCountModule {}
