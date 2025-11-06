import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentResponse } from '../../../model/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentListService {
  private readonly baseUrl =
    'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Department/GetDepartmentList';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(this.baseUrl);
  }
}
