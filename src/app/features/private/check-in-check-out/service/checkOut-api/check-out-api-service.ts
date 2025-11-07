import { Injectable } from '@angular/core';
import { baseAttendanceApi } from '../../../../../../environment';
import { HttpClient } from '@angular/common/http';
import { CheckOutRequest, CheckOutResponse } from '../../model/checkOut-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckOutApiService {
  private checkOutUrl = `${baseAttendanceApi}/Attendance/CheckOut`;

  constructor(private httpClient: HttpClient) {}

  checkOut(payload: CheckOutRequest): Observable<CheckOutResponse> {
    return this.httpClient.post<CheckOutResponse>(this.checkOutUrl, payload);
  }
}
