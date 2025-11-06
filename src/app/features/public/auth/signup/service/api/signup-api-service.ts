import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequest, SignupResponse } from '../../models/signup.model';

@Injectable({
  providedIn: 'root',
})
export class SignupApiService {
  private ApiUrl_Signup =
    'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Employee/RegisterEmployee';
  constructor(private http: HttpClient) {}
  signup(payload: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.ApiUrl_Signup, payload);
  }
}
