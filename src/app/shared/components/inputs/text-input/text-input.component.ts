import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../angular-material.module';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  @Input() control: FormControl = new FormControl('');
  @Input({ required: true }) label?: string;
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) type: string = 'text';

  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }
}
