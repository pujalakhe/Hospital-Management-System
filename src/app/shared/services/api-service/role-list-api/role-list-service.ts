import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleResponse } from '../../../model/role.model';
import { baseUserApi } from '../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class RoleListService {
  private readonly roleUrl = `${baseUserApi}/Employee/GetAllRoles`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(this.roleUrl);
  }
}
