import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, mergeMap, exhaustMap } from 'rxjs';

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

  // dispatch load status when check-in succeeds
  checkInSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceActions.checkInSuccess),
      map(() => AttendanceActions.loadCheckInStatusRequest())
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

  // dispatch load status when check-in succeeds
  checkOutSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceActions.checkOutSuccess),
      map(() => AttendanceActions.loadCheckInStatusRequest())
    )
  );

  loadCheckInStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceActions.loadCheckInStatusRequest),
      mergeMap(() =>
        this.checkInCheckOutApiService.getCheckInStatus().pipe(
          map((response) =>
            AttendanceActions.loadCheckInStatusSuccess({
              checkInStatus: response.data,
            })
          ),
          catchError((error) =>
            of(
              AttendanceActions.loadCheckInStatusFailure({
                error: error.message || 'Error',
              })
            )
          )
        )
      )
    )
  );
}
