import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AttendanceListRequest,
  AttendanceListResponse,
} from '../../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceListApiService {
  private baseUrl = 'https://621qck2j-2209.inc1.devtunnels.ms/api/Attendance';

  constructor(private http: HttpClient) {}

  listAllAttendance(
    payload: AttendanceListRequest
  ): Observable<AttendanceListResponse> {
    return this.http.post<AttendanceListResponse>(
      `${this.baseUrl}/ListAllAttendance`,
      payload
    );
  }
}
