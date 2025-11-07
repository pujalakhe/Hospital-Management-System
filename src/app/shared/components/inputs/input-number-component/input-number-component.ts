import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../angular-material.module';
import { OnlyNumericValueDirective } from '../../../custom-directives/only-numeric/only-numeric-value-directive';

@Component({
  selector: 'app-input-number-component',
  imports: [MaterialModule, ReactiveFormsModule, OnlyNumericValueDirective],
  templateUrl: './input-number-component.html',
  styleUrl: './input-number-component.scss',
})
export class InputNumberComponent {
  @Input({ required: true }) control?: FormControl;
  @Input({ required: true }) label?: string;
  @Input({ required: true }) placeholder: string = '';
  @Input({}) min?: number;
}
