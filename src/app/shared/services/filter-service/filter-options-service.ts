import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FilterOption } from '../../model/filter.model';



@Injectable({
  providedIn: 'root',
})
export class FilterOptionsService {
  constructor(private http: HttpClient) {}
  
  getFilterOptions(endpoint: string, field: string): Observable<FilterOption[]> {
    return this.http.get<any[]>(`${endpoint}/filter-options/${field}`).pipe(
      map((options) =>
        options.map((option) => ({
          value: option.value || option,
          label: option.label || option.name || option.toString(),
        }))
      ),
      catchError(() => of([])) // Return empty array on error
    );
  }
}
