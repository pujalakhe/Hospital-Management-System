import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseUserApi } from '../../../../../../../environment';
import { AUTH_TOKEN_KEY } from '../../../../../../core/constants/storage.constants';

import { LoginRequest, LoginResponse } from '../../../login/model/login.model';
@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private loginApi = `${baseUserApi}/Login/Login`;

  constructor(private httpClient: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginApi, payload);
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
