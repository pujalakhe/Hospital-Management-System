import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(({ user, token }) => AuthActions.loginSuccess({ user, token })),
          catchError((err) =>
            of(
              AuthActions.loginFailure({ error: err.message || 'Login failed' })
            )
          )
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
