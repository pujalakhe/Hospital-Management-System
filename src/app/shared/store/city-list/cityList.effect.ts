import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CityActions from './cityList.action';
import { CityListService } from '../../services/api-service/city-list-api/city-list-service';

@Injectable()
export class CityEffects {
  private actions$ = inject(Actions);

  constructor(private cityListService: CityListService) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.loadCity),
      mergeMap(() =>
        this.cityListService.getCities().pipe(
          map((response) =>
            CityActions.loadCitySuccess({ cities: response.data })
          ),
          catchError((error) => of(CityActions.loadCityFailure({ error })))
        )
      )
    )
  );
}
