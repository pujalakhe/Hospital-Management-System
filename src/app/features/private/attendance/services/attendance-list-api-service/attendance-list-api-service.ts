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
  private baseUrl = 'https://vjb9dgzs-2209.inc1.devtunnels.ms/api/Attendance';

  constructor(private http: HttpClient) {}

  listAllAttendance(
    payload: AttendanceListRequest
  ): Observable<AttendanceListResponse> {
    return this.http
      .post<AttendanceListResponse>(
        `${this.baseUrl}/ListAllAttendance`,
        payload
      )
      // .pipe(
      //   tap(() => console.log('API called successfully')),
      //   map(() => this.getMockData(payload)),
      //   catchError((error) => {
      //     console.error('API failed, using mock data instead:', error);
      //     return of(this.getMockData(payload));
      //   })
      // );
  }

   
  // private getMockData(payload: AttendanceListRequest): AttendanceListResponse {
  //   const mockEmployees = [
  //     { id: 'EMP001', name: 'John Doe', deptId: 101, dept: 'IT Department' },
  //     { id: 'EMP002', name: 'Jane Smith', deptId: 102, dept: 'HR Department' },
  //     { id: 'EMP003', name: 'Alex Brown', deptId: 103, dept: 'Finance Department' },
  //     { id: 'EMP004', name: 'Chris Evans', deptId: 104, dept: 'Marketing' },
  //     { id: 'EMP005', name: 'Sophia Lee', deptId: 105, dept: 'Operations' },
  //     { id: 'EMP006', name: 'Michael Chen', deptId: 106, dept: 'IT Department' },
  //     { id: 'EMP007', name: 'Emma Johnson', deptId: 107, dept: 'Design' },
  //     { id: 'EMP008', name: 'Liam Wilson', deptId: 108, dept: 'Support' },
  //     { id: 'EMP009', name: 'Olivia Martinez', deptId: 109, dept: 'Finance Department' },
  //     { id: 'EMP010', name: 'Noah Davis', deptId: 110, dept: 'Sales' },
  //   ];

  //   const statuses = [
  //     AttendanceStatus.Present,
  //     AttendanceStatus.Absent,
  //     AttendanceStatus.Late,
  //     AttendanceStatus.HalfDay,
  //   ];

  //   const mockRecords = mockEmployees.map((emp, index) => {
  //     const randomStatus = statuses[index % statuses.length];
  //     const isAbsent = randomStatus === AttendanceStatus.Absent;

  //     return {
  //       id: index + 1,
  //       employeeId: emp.id,
  //       employeeName: emp.name,
  //       departmentId: emp.deptId,
  //       departmentName: emp.dept,
  //       date: `2025-11-${String(12 - (index % 3)).padStart(2, '0')}`,
  //       checkIn: isAbsent ? '' : `${9 + (index % 2)}:${index % 2 === 0 ? '00' : '15'} AM`,
  //       checkOut: isAbsent ? '' : `${5 + (index % 2)}:${index % 2 === 0 ? '30' : '45'} PM`,
  //       status: randomStatus,
  //       totalHours: isAbsent ? 0 : 8 - (index % 2),
  //       workLocation: (index % 2) + 1,
  //       notes: isAbsent ? 'Absent' : 'Normal day',
  //     };
  //   });

  //   return {
  //     result: 1,
  //     message: '✅ Mock attendance data loaded successfully',
  //     data: {
  //       count: mockRecords.length,
  //       take: payload.take,
  //       skip: payload.skip,
  //       data: mockRecords,
  //     },
  //   };
  // }
}
