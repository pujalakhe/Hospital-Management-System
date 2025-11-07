import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/service/auth-service/auth-service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authService = inject(AuthService);
  logout() {
    this.authService.logout();
  }
}
