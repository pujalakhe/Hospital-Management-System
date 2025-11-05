import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ChangePasswordActions from './changePassword.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ChangepasswordApiService } from '../../services/change-password-api/change-password-api-service';

@Injectable()
export class ChangePasswordEffects {
  private actions$ = inject(Actions);
  constructor(private changePasswordService: ChangepasswordApiService) {}

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangePasswordActions.changePassword),
      mergeMap(({ oldPassword, newPassword }) =>
        this.changePasswordService
          .changePassword({ oldPassword, newPassword })
          .pipe(
            map((response: any) =>
              ChangePasswordActions.changePasswordSuccess({
                message: response?.message || 'Password changed successfully!',
              })
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
