import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CityActions from './cityListByCountryId.action';
import { CityListByCountryIdService } from '../../services/api-service/city-list-by-countryId-api/city-list-by-country-id-service';

@Injectable()
export class CityByCountryIdEffects {
  private actions$ = inject(Actions);

  constructor(private cityListService: CityListByCountryIdService) {}

  loadCitiesByCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.loadCitiesByCountry),
      mergeMap(({ countryId }) =>
        this.cityListService.getCitiesByCountryId(countryId).pipe(
          map((response) =>
            CityActions.loadCitiesByCountrySuccess({ cities: response.data })
          ),
          catchError((error) =>
            of(CityActions.loadCitiesByCountryFailure({ error }))
          )
        )
      )
    )
  );
}
