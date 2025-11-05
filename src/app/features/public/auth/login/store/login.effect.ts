import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import * as LoginActions from './login.action';

import { SnackbarService } from '../../../../../shared/services/snackbar-service/snackbar-service';
import { SNACKBAR_TYPE } from '../../../../../shared/constants/snackbar.constants';
import { LoginApiService } from '../../services/login-api/login-api-service';
import { AUTH_TOKEN_KEY } from '../../../../../core/constants/storage.constants';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';

const { SUCCESS, ERROR } = SNACKBAR_TYPE;
@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private loginService = inject(LoginApiService);
  private snackbarService = inject(SnackbarService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap(({ credentials }) =>
        this.loginService.login(credentials).pipe(
          map((response) => LoginActions.loginSuccess({ response })),
          catchError((err) => {
            this.snackbarService.error('Login Failed');
            return of(LoginActions.loginFailure({ error: err.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.loginSuccess),
        tap(({ response }) => {
          localStorage.setItem(AUTH_TOKEN_KEY, response.data.token ?? '');
          this.snackbarService.success(response.message);
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logout),
        tap(() => {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          this.snackbarService.success('User logged out Successfully');
          this.router.navigate([ROUTER_PATHS.LOGIN]);
        })
      ),
    { dispatch: false }
  );
}
