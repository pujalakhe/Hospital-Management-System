import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap, exhaustMap } from 'rxjs';

import * as CheckInCheckOutActions from './check-in-check-out.actions';
import { CheckInCheckOutApiService } from '../service/check-in-check-out-api-service/check-in-check-out-api-service';

@Injectable()
export class CheckInEffects {
  private actions$ = inject(Actions);
  private checkInCheckOutApiService = inject(CheckInCheckOutApiService);

  // API call effect
  checkIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckInCheckOutActions.checkInRequest),
      exhaustMap(({ payload }) =>
        this.checkInCheckOutApiService.checkIn(payload).pipe(
          map((response) =>
            CheckInCheckOutActions.checkInSuccess({ response })
          ),
          catchError((err) =>
            of(
              CheckInCheckOutActions.checkInFailure({
                error: err.message || 'Failed to Check In',
              })
            )
          )
        )
      )
    )
  );

  // checkOut$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CheckInCheckOutActions.checkOutRequest),
  //     exhaustMap(({ payload }) =>
  //       this.checkInCheckOutApiService.checkOut(payload).pipe(
  //         map((response) =>
  //           CheckInCheckOutActions.checkOutSuccess({ response })
  //         ),
  //         catchError((err) =>
  //           of(
  //             CheckInCheckOutActions.checkOutFailure({
  //               error: err.message || 'Failed to Check Out',
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );
}
