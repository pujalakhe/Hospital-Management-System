import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialModule } from '../../../angular-material.module';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent {
  @Input({ required: true }) control: FormControl = new FormControl('');
  @Input({ required: true }) label?: string;
  @Input({ required: true }) accept: string = '*';

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  openFilePicker() {
    this.fileInput?.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.control.setValue(file);
      this.control.markAsDirty();
      this.control.markAsTouched();
    }
  }

  get fileName(): string | null {
    return this.control.value ? this.control.value.name : null;
  }
}
