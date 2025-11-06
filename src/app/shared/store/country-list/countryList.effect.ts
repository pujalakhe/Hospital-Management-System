import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CountryActions from './countryList.action';
import { CountryListService } from '../../services/api-service/country-list-api/country-list-service';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);

  constructor(private countryListService: CountryListService) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countryListService.getCountries().pipe(
          map((response) =>
            CountryActions.loadCountriesSuccess({ countries: response.data })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error }))
          )
        )
      )
    )
  );
}
