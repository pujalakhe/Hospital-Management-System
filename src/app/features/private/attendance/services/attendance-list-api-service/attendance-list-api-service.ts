import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import {
  AttendanceListRequest,
  AttendanceListResponse,
  AttendanceStatus,
} from '../../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceListApiService {
  private baseUrl = 'https://1238r13n-2209.inc1.devtunnels.ms/api/Attendance';

  constructor(private http: HttpClient) {}

  listAllAttendance(
    payload: AttendanceListRequest
  ): Observable<AttendanceListResponse> {
    return this.http
      .post<AttendanceListResponse>(
        `${this.baseUrl}/ListAllAttendance`,
        payload
      )
    
  }

  }
