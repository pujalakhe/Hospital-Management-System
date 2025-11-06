import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../../model/changePassword.model';
import { baseUserApi } from '../../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ChangepasswordApiService {
  private changePasswordUrl = `${baseUserApi}/Login/ChangePassword`;

  constructor(private http: HttpClient) {}

  changePassword(payload: ChangePasswordRequest): Observable<any> {
    return this.http.post(this.changePasswordUrl, payload);
  }
}
