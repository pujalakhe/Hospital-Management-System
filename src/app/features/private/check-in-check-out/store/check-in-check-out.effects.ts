import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, exhaustMap } from 'rxjs';

import * as AttendanceActions from './check-in-check-out.actions';
import { CheckInCheckOutApiService } from '../service/check-in-check-out-api-service/check-in-check-out-api-service';

@Injectable()
export class CheckInCheckOutEffects {
  private actions$ = inject(Actions);
  private checkInCheckOutApiService = inject(CheckInCheckOutApiService);

  // API call effect
  checkIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceActions.checkInRequest),
      exhaustMap(({ payload }) =>
        this.checkInCheckOutApiService.checkIn(payload).pipe(
          map((response) => AttendanceActions.checkInSuccess({ response })),
          catchError((err) =>
            of(
              AttendanceActions.checkInFailure({
                error: err.message || 'Failed to Check In',
              })
            )
          )
        )
      )
    )
  );

  checkOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceActions.checkOutRequest),
      exhaustMap(({ payload }) =>
        this.checkInCheckOutApiService.checkOut(payload).pipe(
          map((response) => AttendanceActions.checkOutSuccess({ response })),
          catchError((err) =>
            of(
              AttendanceActions.checkOutFailure({
                error: err.message || 'Failed to Check Out',
              })
            )
          )
        )
      )
    )
  );
}
