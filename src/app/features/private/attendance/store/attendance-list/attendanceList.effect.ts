import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as AttendanceListActions from '../attendance-list/attendanceList.action';
import { AttendanceListApiService } from '../../services/attendance-list-api-service/attendance-list-api-service';

@Injectable()
export class AttendanceListEffect {
   private actions$ = inject(Actions);
  private attendanceListApiService = inject(AttendanceListApiService);

  loadAttendanceList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendanceListActions.loadAttendanceList),
      switchMap(({ payload }) =>
        this.attendanceListApiService.listAllAttendance(payload).pipe(
          map((res) =>
            AttendanceListActions.loadAttendanceListSuccess({
              data: res.data.data,
            })
          ),
          catchError((error) =>
            of(AttendanceListActions.loadAttendanceListFailure({ error }))
          )
        )
      )
    )
  );
}
