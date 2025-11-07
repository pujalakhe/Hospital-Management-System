import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUserApi } from '../../../../../../../environment';

interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
}

@Injectable({ providedIn: 'root' })
export class ResetPasswordApiService {
  private baseUrl = baseUserApi;

  constructor(private http: HttpClient) {}

  requestOtp(payload: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login/RequestOtp`, payload);
  }

  resetPassword(payload: { email: string; newPassword: string; otp: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login/ResetPassword`, payload);
  }
}