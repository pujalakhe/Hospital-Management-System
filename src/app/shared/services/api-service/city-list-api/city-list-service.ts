import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityResponse } from '../../../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityListService {
  private readonly baseUrl =
    'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/City/GetCityList';

  constructor(private http: HttpClient) {}

  getCities(): Observable<CityResponse> {
    return this.http.get<CityResponse>(this.baseUrl);
  }
}
