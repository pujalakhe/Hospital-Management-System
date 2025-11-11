import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class SidebarComponent {
  @Output() logout = new EventEmitter<void>();
  @Input() menuItems: menuItems[] = [];
  @Input() collapsed: boolean = false;

  constructor(private router: Router) {}

  isActive(route: string | undefined): boolean {
    return this.router.url === route;
  }
  onLogout() {
    this.router.navigate([ROUTER_PATHS.LOGIN]);
  }
}
