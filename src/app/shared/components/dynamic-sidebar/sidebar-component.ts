import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MaterialModule } from '../../angular-material.module';
import { Router, RouterModule } from '@angular/router';
import { menuItems } from '../wrapper-component/type/sidebar.type';
import { MatIconModule } from '@angular/material/icon';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

@Component({
  selector: 'app-sidebar-component',
  imports: [MaterialModule, RouterModule, MatIconModule],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
})
export class SidebarComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();
  @Input() menuItems: menuItems[] = [];
  isMobile = false;
  isSidebarOpen = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.isSidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onLogout() {
    this.router.navigate([ROUTER_PATHS.LOGIN]);
  }
}
