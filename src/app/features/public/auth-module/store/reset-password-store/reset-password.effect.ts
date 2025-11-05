import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer, defer } from 'rxjs';
import {
  map,
  catchError,
  exhaustMap,
  tap,
  takeUntil,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import * as ResetPasswordActions from './reset-password.action';
import * as ResetPasswordSelectors from './reset-password.selector';
import { ResetPasswordApiService, ResetPasswordRequest, ResetPasswordResponse, SendOtpResponse } from '../../services/reset-password-service/reset-password-api-service/reset-password-api-service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ResetPasswordEffects {

    private readonly actions$ = inject(Actions);
  private readonly resetPasswordApiService = inject(ResetPasswordApiService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  /** Send OTP */
  // In reset-password.effect.ts
sendOTP$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ResetPasswordActions.sendOTP),
    tap(({ email }) => console.log('[ResetPassword] Sending OTP to:', email)),
    exhaustMap(({ email }) => {
      return this.resetPasswordApiService.sendOTP(email).pipe(
        map((response: SendOtpResponse) => {
          return ResetPasswordActions.sendOTPSuccess({ 
            email,  // Include email in the success action
            message: response.message || 'OTP sent successfully' 
          });
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMsg = error.error?.message || error.message || 'Failed to send OTP';
          return of(ResetPasswordActions.sendOTPFailure({ error: errorMsg }));
        })
      );
    })
  )
);

  /** Start OTP timer on success */
  sendOTPSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.sendOTPSuccess),
      map(() => ResetPasswordActions.startOTPTimer())
    )
  );

  /** Resend OTP */
  resendOTP$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ResetPasswordActions.resendOTP),
    withLatestFrom(this.store.select(ResetPasswordSelectors.selectEmail)),
    tap(([_, email]) => console.log('[ResetPassword] Resending OTP to:', email)),
    exhaustMap(([_, email]) => {
      if (!email) {
        const error = 'Email not found for resending OTP';
        return of(ResetPasswordActions.sendOTPFailure({ error }));
      }

      return this.resetPasswordApiService.sendOTP(email).pipe(
        map((response: SendOtpResponse) => {
          return ResetPasswordActions.sendOTPSuccess({ 
            email,  // Include email here
            message: response.message || 'OTP resent successfully' 
          });
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMsg = error.error?.message || 'Failed to resend OTP';
          return of(ResetPasswordActions.sendOTPFailure({ error: errorMsg }));
        })
      );
    })
  )
);

  /** OTP Timer */
  otpTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.startOTPTimer),
      switchMap(() =>
        timer(0, 1000).pipe(
          map(() => ResetPasswordActions.decrementOTPTimer()),
          takeUntil(this.actions$.pipe(ofType(ResetPasswordActions.stopOTPTimer, ResetPasswordActions.resetState)))
        )
      )
    )
  );

  /** Auto stop timer */
  autoStopTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.decrementOTPTimer),
      withLatestFrom(this.store.select(ResetPasswordSelectors.selectOTPTimer)),
      map(([action, timer]) => (timer === 0 ? ResetPasswordActions.stopOTPTimer() : { type: 'NO_ACTION' }))
    )
  );

  /** Verify OTP */
  verifyOTP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.verifyOTP),
      withLatestFrom(this.store.select(ResetPasswordSelectors.selectEmail)),
      exhaustMap(([{ otp }, email]) => {
        if (!email) {
          return of(ResetPasswordActions.verifyOTPFailure({ error: 'Email not found' }));
        }

        // If API for OTP verification exists, replace below with API call
        return of(ResetPasswordActions.verifyOTPSuccess());
      })
    )
  );

  /** Reset Password */
  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetPasswordActions.resetPassword),
      exhaustMap(({ email, newPassword, otp }) => {
        const payload: ResetPasswordRequest = { email, newPassword, otp };
        return this.resetPasswordApiService.resetPassword(payload).pipe(
          map((response: ResetPasswordResponse) => {
            this.showSnackBar(response.message || 'Password reset successfully!', 'success');
            return ResetPasswordActions.resetPasswordSuccess({ message: response.message || 'Password reset' });
          }),
          catchError((error) => {
            const errorMsg = error.error?.message || 'Failed to reset password';
            this.showSnackBar(errorMsg, 'error');
            return of(ResetPasswordActions.resetPasswordFailure({ error: errorMsg }));
          })
        );
      })
    )
  );

  /** Navigate to login on success */
  resetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ResetPasswordActions.resetPasswordSuccess),
        tap(() => setTimeout(() => this.router.navigate(['/login']), 3000))
      ),
    { dispatch: false }
  );

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }
}
