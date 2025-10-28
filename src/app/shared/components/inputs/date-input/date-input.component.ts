import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../angular-material.module';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
})
export class DateInputComponent {
  @Input({ required: true }) control: FormControl = new FormControl('');
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder: string = '';
}
