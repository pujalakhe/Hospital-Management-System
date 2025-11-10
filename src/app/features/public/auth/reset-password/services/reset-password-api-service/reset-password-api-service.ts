import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseUserApi } from '../../../../../../../environment';
import {
  RequestOtpRequest,
  RequestOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../../model/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordApiService {
  private requestOtpApi = `${baseUserApi}/Login/RequestOtp`;
  private resetPasswordApi = `${baseUserApi}/Login/ResetPassword`;

  constructor(private httpClient: HttpClient) { }

  requestOtp(payload: RequestOtpRequest): Observable<RequestOtpResponse> {
    return this.httpClient.post<RequestOtpResponse>(this.requestOtpApi, payload);
  }

  resetPassword(payload: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.httpClient.post<ResetPasswordResponse>(
      this.resetPasswordApi,
      payload
    );
  }
}

