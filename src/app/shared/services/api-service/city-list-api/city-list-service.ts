import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityResponse } from '../../../model/city.model';
import { baseUserApi } from '../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CityListService {
  private readonly CityUrl = `${baseUserApi}/City/GetCityList`;

  constructor(private http: HttpClient) {}

  getCities(): Observable<CityResponse> {
    return this.http.get<CityResponse>(this.CityUrl);
  }
}
