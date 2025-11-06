import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentResponse } from '../../../model/department.model';
import { baseUserApi } from '../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentListService {
  private readonly departmentUrl = `${baseUserApi}/Department/GetDepartmentList`;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(this.departmentUrl);
  }
}
