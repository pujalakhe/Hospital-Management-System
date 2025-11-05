import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryResponse } from '../../../model/country.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  private readonly baseUrl =
    'https://zb9qd6n8-14650.inc1.devtunnels.ms/api/Country/GetCountryList';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(this.baseUrl);
  }
}
