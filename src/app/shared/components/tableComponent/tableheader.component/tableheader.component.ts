import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tableheader-component',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './tableheader.component.html',
  styleUrls: ['./tableheader.component.scss']
})
export class TableheaderComponent {
 @Input() tableTitle: string = '';
  @Input() buttonLabel: string = 'Add'; // generic button label
  @Output() buttonClicked = new EventEmitter<void>();

  onActionClick() {
    this.buttonClicked.emit();
  }
}
