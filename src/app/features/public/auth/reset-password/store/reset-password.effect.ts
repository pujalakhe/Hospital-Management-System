import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as ResetPasswordActions from './reset-password.action';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResetPasswordEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  requestOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.requestOtp),
      exhaustMap(({ email }) =>
        this.http.post<any>('https://zb9qd6n8-14650.inc1.devtunnels.ms/api/login/RequestOtp', { email }).pipe(
          map(() => ResetPasswordActions.requestOtpSuccess()),
          catchError((err) => of(ResetPasswordActions.requestOtpFailure({ error: err.message || 'OTP request failed' })))
        )
      )
    )
  );

  

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.resetPassword),
      exhaustMap(({ email, otp, newPassword }) =>
        this.http.post<any>('https://zb9qd6n8-14650.inc1.devtunnels.ms/api/login/ResetPassword', {
          email,
          otp,
          newPassword
        }).pipe(
          map(() => ResetPasswordActions.resetPasswordSuccess()),
          catchError((err) => of(ResetPasswordActions.resetPasswordFailure({ error: err.message || 'Reset password failed' })))
        )
      )
    )
  );
}
