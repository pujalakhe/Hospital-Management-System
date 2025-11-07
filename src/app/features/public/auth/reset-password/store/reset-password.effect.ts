import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as ResetPasswordActions from './reset-password.action';
import { Router } from '@angular/router';
import { ResetPasswordApiService } from '../services/reset-password-api-service/reset-password-api-service';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';

const { LOGIN } = ROUTER_PATHS;

@Injectable()
export class ResetPasswordEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private resetPasswordApiService = inject(ResetPasswordApiService);

  requestOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.requestOtp),
      exhaustMap(({ email }) =>
        this.resetPasswordApiService.requestOtp({ email }).pipe(
          map(() => ResetPasswordActions.requestOtpSuccess()),
          catchError((err) =>
            of(
              ResetPasswordActions.requestOtpFailure({
                error: err.message || 'OTP request failed',
              })
            )
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.resetPassword),
      exhaustMap(({ email, otp, newPassword }) =>
        this.resetPasswordApiService
          .resetPassword({ email, otp, newPassword })
          .pipe(
            map(() => ResetPasswordActions.resetPasswordSuccess()),
            tap(() => this.router.navigate([LOGIN])),
            catchError((err) =>
              of(
                ResetPasswordActions.resetPasswordFailure({
                  error: err.message || 'Reset password failed',
                })
              )
            )
          )
      )
    )
  );
}
