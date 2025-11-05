import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoggedUserCredentials,
  LoginUserResponse,
} from '../../login/model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api = '/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(credentials: LoggedUserCredentials): Observable<LoginUserResponse> {
    return this.httpClient.post<LoginUserResponse>(
      `${this.api}/login`,
      credentials
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
