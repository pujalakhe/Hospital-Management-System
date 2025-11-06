import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryResponse } from '../../../model/country.model';
import { Observable } from 'rxjs';
import { baseUserApi } from '../../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  private readonly CountryUrl = `${baseUserApi}/Country/GetCountryList`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(this.CountryUrl);
  }
}
