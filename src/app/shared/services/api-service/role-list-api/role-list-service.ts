import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleResponse } from '../../../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleListService {
  private readonly baseUrl =
    'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Employee/GetAllRoles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(this.baseUrl);
  }
}
