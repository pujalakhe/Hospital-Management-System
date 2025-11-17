import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceResponse } from '../../models/attendance-detail.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceDetailApiService {

  private baseUrl = 'https://1238r13n-2209.inc1.devtunnels.ms/api/Attendance';

  constructor(private http: HttpClient) {}

  getAttendanceById(id: number): Observable<AttendanceResponse> {
    const params = new HttpParams().set('id', id);

    return this.http.get<AttendanceResponse>(
      `${this.baseUrl}/GetAttendanceById`,
      { params }
    );
  }
}
