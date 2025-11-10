import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SignupActions from '../store/signup.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SignupApiService } from '../service/api/signup-api-service';
import { SignupResponse } from '../models/signup.model';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';
const { LOGIN } = ROUTER_PATHS;
@Injectable()
export class signupEffects {
  private action$ = inject(Actions);
  constructor(
    private router: Router,
    private signupApiService: SignupApiService
  ) {}

  signup$ = createEffect(() =>
    this.action$.pipe(
      ofType(SignupActions.signup),
      switchMap(({ payload }) =>
        this.signupApiService.signup(payload).pipe(
          map((res: SignupResponse) =>
            SignupActions.signupSuccess({
              data: res,
            })
          ),
          catchError((error) =>
            of(SignupActions.signupFailure({ error: error.message }))
          )
        )
      )
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(SignupActions.signupSuccess),
        tap(() => {
          this.router.navigate([LOGIN]);
        })
      ),
    { dispatch: false }
  );
}
