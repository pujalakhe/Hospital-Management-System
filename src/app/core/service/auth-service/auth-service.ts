import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '../../constants/storage.constants';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../../constants/router-path.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  getUserToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    // returns true if token exists, false otherwise.
    return !!this.getUserToken();
  }

  logout(): void {
    this.router.navigate([ROUTER_PATHS.LOGIN]);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
