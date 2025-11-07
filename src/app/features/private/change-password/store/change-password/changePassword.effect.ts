import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ChangePasswordActions from './changePassword.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ChangepasswordApiService } from '../../services/change-password-api/change-password-api-service';
import { ChangePasswordResponse } from '../../model/changePassword.model';

@Injectable()
export class ChangePasswordEffects {
  private actions$ = inject(Actions);
  constructor(private changePasswordService: ChangepasswordApiService) {}

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangePasswordActions.changePassword),
      mergeMap(({ credentials }) =>
        this.changePasswordService.changePassword(credentials).pipe(
          map((response: ChangePasswordResponse) =>
            ChangePasswordActions.changePasswordSuccess({ response })
          ),
          catchError((error) =>
            of(
              ChangePasswordActions.changePasswordFailure({
                error:
                  error.error?.message ||
                  'Something went wrong while changing password.',
              })
            )
          )
        )
      )
    )
  );
}
