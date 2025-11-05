import { Injectable } from '@angular/core';
import { AUTH_TOKEN_KEY } from '../../constants/storage.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    // returns true if token exists, false otherwise.
    return !!this.getUserToken();
  }
}
