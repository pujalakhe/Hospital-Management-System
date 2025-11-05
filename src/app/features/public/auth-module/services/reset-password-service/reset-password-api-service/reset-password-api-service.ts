import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  otp: string;
}

export interface ResetPasswordResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordApiService {
  private requestOtpApi = 'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Login/RequestOTP';
  private resetPasswordApi = 'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Login/ResetPassword';

  constructor(private http: HttpClient) {}

  /** Request OTP */
  sendOTP(email: string): Observable<SendOtpResponse> {
    return this.http.post<SendOtpResponse>(this.requestOtpApi, { email });
  }

  /** Reset password using OTP */
  resetPassword(payload: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(this.resetPasswordApi, payload);
  }
}
