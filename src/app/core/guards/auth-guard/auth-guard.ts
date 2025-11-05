import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ROUTER_PATHS } from '../../constants/router-path.constant';
import { AuthService } from '../../service/auth-service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isUnauthenticated = !this.authService.isAuthenticated();
    if (isUnauthenticated) {
      this.router.navigate([ROUTER_PATHS.LOGIN]);
      return false;
    }
    return true;
  }
}
