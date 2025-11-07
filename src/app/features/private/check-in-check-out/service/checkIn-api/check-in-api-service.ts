import { Injectable } from '@angular/core';
import { baseAttendanceApi } from '../../../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckInRequest, CheckInResponse } from '../../model/checkIn-model';

@Injectable({
  providedIn: 'root',
})
export class CheckInApiService {
  private checkInUrl = `${baseAttendanceApi}/Attendance/CheckIn`;

  constructor(private httpClient: HttpClient) {}

  checkIn(payload: CheckInRequest): Observable<CheckInResponse> {
    return this.httpClient.post<CheckInResponse>(this.checkInUrl, payload);
  }
}
