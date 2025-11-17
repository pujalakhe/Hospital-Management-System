import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AttendanceDetailActions from './attendanceDetail.action';
import { AttendanceDetailApiService } from '../../services/attendance-detail-api-service/attendance-detail-api-service';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class AttendanceDetailEffects {
  private actions$ = inject(Actions);
  private attendanceDetailApiService = inject(AttendanceDetailApiService);

  loadAttendanceDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceDetailActions.loadAttendanceDetail),
      exhaustMap(({ payload }) =>
        this.attendanceDetailApiService.getAttendanceById(payload.employeeId)
.pipe(
          map((response) =>
            AttendanceDetailActions.loadAttendanceDetailSuccess({ data: response })
          ),
          catchError((error) =>
            of(
              AttendanceDetailActions.loadAttendanceDetailFailure({
                error: error?.message || 'Failed to load attendance detail',
              })
            )
          )
        )
      )
    )
  );
}