import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import * as AuthActions from './login.action';

import { AuthService } from '../../services/auth-service/auth-service';
import { SnackbarService } from '../../../../../shared/services/snackbar-service/snackbar-service';

import {
  SNACKBAR_DURATION,
  SNACKBAR_TYPE,
} from '../../../../../shared/constants/snackbar.constants';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackbarService = inject(SnackbarService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(({ user, token }) => AuthActions.loginSuccess({ user, token })),
          catchError((err) => {
            this.snackbarService.show(
              'Login Failed',
              SNACKBAR_TYPE.ERROR,
              SNACKBAR_DURATION.SHORT
            );
            return of(AuthActions.loginFailure({ error: err.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token }) => {
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
