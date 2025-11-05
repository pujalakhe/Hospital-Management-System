import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as DepartmentActions from './departmentList.action';
import { CityListService } from '../../services/api-service/city-list-api/city-list-service';
import { DepartmentListService } from '../../services/api-service/department-list-api/department-list-service';

@Injectable()
export class DepartmentEffects {
  private actions$ = inject(Actions);

  constructor(private departmentListService: DepartmentListService) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.loadDepartments),
      mergeMap(() =>
        this.departmentListService.getDepartments().pipe(
          map((response) =>
            DepartmentActions.loadDepartmentsSuccess({
              departments: response.data,
            })
          ),
          catchError((error) =>
            of(DepartmentActions.loadDepartmentsFailure({ error }))
          )
        )
      )
    )
  );
}
