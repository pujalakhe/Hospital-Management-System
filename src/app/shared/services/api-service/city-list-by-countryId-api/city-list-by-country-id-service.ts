import { Injectable } from '@angular/core';
import { baseUserApi } from '../../../../../environment';
import { HttpClient } from '@angular/common/http';
import { CityResponse } from '../../../model/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityListByCountryIdService {
  private readonly CityUrl = `${baseUserApi}/City/GetCityByCountryId`;

  constructor(private http: HttpClient) {}

  getCitiesByCountryId(countryId: number): Observable<CityResponse> {
    return this.http.get<CityResponse>(
      `${this.CityUrl}?countryId=${countryId}`
    );
  }
}
