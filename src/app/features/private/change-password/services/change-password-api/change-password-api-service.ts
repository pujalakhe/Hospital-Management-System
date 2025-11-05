import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../../model/changePassword.model';

@Injectable({
  providedIn: 'root',
})
export class ChangepasswordApiService {
  private apiUrl =
    'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Login/ChangePassword';

  constructor(private http: HttpClient) {}

  changePassword(payload: ChangePasswordRequest): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
