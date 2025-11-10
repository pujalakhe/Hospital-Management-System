import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequest, SignupResponse } from '../../models/signup.model';
import { baseUserApi } from '../../../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class SignupApiService {
  private ApiUrl_Signup = `${baseUserApi}/Employee/RegisterEmployee`;
  constructor(private http: HttpClient) {}
  signup(payload: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.ApiUrl_Signup, payload);
  }
}
