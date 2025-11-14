import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/angular-material.module';
import { SelectInputComponent } from '../../../shared/components/inputs/select-input/select-input.component';
import { TextInputComponent } from '../../../shared/components/inputs/text-input/text-input.component';
import { AutoFocusInput } from '../../../shared/custom-directives/AutoFocusInput/auto-focus-input';
import { AutoFocusInvalid } from '../../../shared/custom-directives/AutoFocusInvalid/auto-focus-invalid';
import { CheckInCheckOutDialogBoxComponent } from './components/check-in-check-out-dialog-box-component/check-in-check-out-dialog-box-component';
import { LoaderComponent } from '../../../shared/components/loader-component/loader-component';

@NgModule({
  declarations: [CheckInCheckOutDialogBoxComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TextInputComponent,
    AutoFocusInput,
    AutoFocusInvalid,
    SelectInputComponent,
    LoaderComponent,
  ],
})
export class CheckInCheckOutModule {}
