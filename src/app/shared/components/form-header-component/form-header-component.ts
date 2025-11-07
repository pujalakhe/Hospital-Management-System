import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-header-component',
  imports: [],
  templateUrl: './form-header-component.html',
  styleUrl: './form-header-component.scss',
})
export class FormHeaderComponent {
  @Input({ required: true }) heading: string = '';
  @Input() subHeading: string = '';
}
