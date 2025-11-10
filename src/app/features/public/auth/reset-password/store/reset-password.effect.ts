import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import * as ResetPasswordActions from './reset-password.action';

import { SnackbarService } from '../../../../../shared/services/snackbar-service/snackbar-service';
import { ResetPasswordApiService } from '../services/reset-password-api-service/reset-password-api-service';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';

const { LOGIN } = ROUTER_PATHS;

@Injectable()
export class ResetPasswordEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private resetPasswordApiService = inject(ResetPasswordApiService);
  private snackbarService = inject(SnackbarService);

  requestOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.requestOtp),
      exhaustMap(({ payload }) =>
        this.resetPasswordApiService.requestOtp(payload).pipe(
          map(() => ResetPasswordActions.requestOtpSuccess()),
          catchError((err) => {
            const errorMessage =
              err?.error?.message || err?.message || 'OTP request failed';
            return of(
              ResetPasswordActions.requestOtpFailure({
                error: errorMessage,
              })
            );
          })
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.resetPassword),
      exhaustMap(({ payload }) =>
        this.resetPasswordApiService.resetPassword(payload).pipe(
          map(() => ResetPasswordActions.resetPasswordSuccess()),
          tap(() => this.router.navigate([LOGIN])),
          catchError((err) => {
            const errorMessage =
              err?.error?.message || err?.message || 'Reset password failed';
            return of(
              ResetPasswordActions.resetPasswordFailure({
                error: errorMessage,
              })
            );
          })
        )
      )
    )
  );
}

