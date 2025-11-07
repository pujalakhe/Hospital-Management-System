import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInCheckOutRoutingModule } from './check-in-check-out-routing-module';
import { MaterialModule } from '../../../shared/angular-material.module';
import { CheckInCheckOutDialogBoxComponent } from './components/check-in-check-out-dialog-box-component/check-in-check-out-dialog-box-component';
import { TextInputComponent } from '../../../shared/components/inputs/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusInput } from '../../../shared/custom-directives/AutoFocusInput/auto-focus-input';
import { AutoFocusInvalid } from '../../../shared/custom-directives/AutoFocusInvalid/auto-focus-invalid';
import { SelectInputComponent } from '../../../shared/components/inputs/select-input/select-input.component';

@NgModule({
  declarations: [CheckInCheckOutDialogBoxComponent],
  imports: [
    CommonModule,
    CheckInCheckOutRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TextInputComponent,
    AutoFocusInput,
    AutoFocusInvalid,
    SelectInputComponent,
  ],
})
export class CheckInCheckOutModule {}
