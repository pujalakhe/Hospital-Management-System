import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../../shared/angular-material.module';
import { CHECK_IN_FEATURE_SELECTOR_KEY } from '../check-in-check-out/store/check-in-check-out.constants';
import { CheckInCheckOutEffects } from '../check-in-check-out/store/check-in-check-out.effects';
import { checkInCheckOutReducer } from '../check-in-check-out/store/check-in-check-out.reducer';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { DashboardRoutingModule } from './dashboard-routing-module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    StoreModule.forFeature(
      CHECK_IN_FEATURE_SELECTOR_KEY,
      checkInCheckOutReducer
    ),
    EffectsModule.forFeature([CheckInCheckOutEffects]),
  ],
})
export class DashboardModule {}
