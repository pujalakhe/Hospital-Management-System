import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckInRequest,
  CheckInResponse,
  CheckOutRequest,
  CheckOutResponse,
  statusResponse,
} from '../../model/check-in-check-out-model';
import { map, Observable } from 'rxjs';
import { baseAttendanceApi } from '../../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CheckInCheckOutApiService {
  private checkInUrl = `${baseAttendanceApi}/Attendance/CheckIn`;

  private checkOutUrl = `${baseAttendanceApi}/Attendance/CheckOut`;

  private statusUrl = `${baseAttendanceApi}/Attendance/CheckCheckInStatus`;

  constructor(private httpClient: HttpClient) {}

  checkIn(payload: CheckInRequest): Observable<CheckInResponse> {
    return this.httpClient.post<CheckInResponse>(this.checkInUrl, payload);
  }

  checkOut(payload: CheckOutRequest): Observable<CheckOutResponse> {
    return this.httpClient.post<CheckOutResponse>(this.checkOutUrl, payload);
  }

  getCheckInStatus(): Observable<statusResponse> {
    return this.httpClient.get<statusResponse>(this.statusUrl);
  }
}
