import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
})
export class SelectInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label: string = 'Select option';
  @Input({ required: true }) options: { value: any; label: string }[] = [];
  @Input({ required: true }) placeholder: string = 'Please choose';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.cdr.detectChanges();
    }
  }
}
