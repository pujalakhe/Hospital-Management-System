import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from '../../dynamic-sidebar/sidebar-component';
import { HeaderComponent } from '../../header-component/header-component';
import { menuItems } from '../type/sidebar.type';
import { MaterialModule } from '../../../angular-material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wrapper-component',
  imports: [
    HeaderComponent,
    SidebarComponent,
    MaterialModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './wrapper-component.html',
  styleUrl: './wrapper-component.scss',
})
export class WrapperComponent implements OnInit {
  pageTitle: string = 'HRM System';
  currentUserName: string = 'shri';
  sidebarItems: menuItems[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sidebarItems = [
      { label: 'Dashboard', route: '/wrapper/dashboard', icon: 'dashboard' },
      { label: 'Employees', route: '/app/employees', icon: 'people' },
      { label: 'Attendance', route: '/app/attendance', icon: 'event' },
      {
        label: 'Admin Settings',
        route: '/app/admin-settings',
        icon: 'settings',
      },
    ];
  }
}
