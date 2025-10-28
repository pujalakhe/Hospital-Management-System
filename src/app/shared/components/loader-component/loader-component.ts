import { Component } from '@angular/core';
import { MaterialModule } from '../../angular-material.module';

@Component({
  selector: 'app-loader-component',
  imports: [MaterialModule],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.scss',
})
export class LoaderComponent {}
