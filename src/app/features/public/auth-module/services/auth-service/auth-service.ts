import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, UserCredentials } from '../../model/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = '/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(credentials: UserCredentials): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.api}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
