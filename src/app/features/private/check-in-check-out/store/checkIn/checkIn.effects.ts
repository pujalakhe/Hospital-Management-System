import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap, exhaustMap } from 'rxjs';

import * as CheckInActions from './checkIn.actions';
import { CheckInApiService } from '../../service/checkIn-api/check-in-api-service';

@Injectable()
export class CheckInEffects {
  private actions$ = inject(Actions);
  private checkInService = inject(CheckInApiService);

  // API call effect
  checkIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckInActions.checkInRequest),
      tap((action) => console.log('Effect triggered with', action)),
      exhaustMap(({ payload }) =>
        this.checkInService.checkIn(payload).pipe(
          tap(() => console.log('API call triggered')),
          map((response) => CheckInActions.checkInSuccess({ response })),
          catchError((err) =>
            of(
              CheckInActions.checkInFailure({
                error: err.message || 'Failed to Check In',
              })
            )
          )
        )
      )
    )
  );
}
