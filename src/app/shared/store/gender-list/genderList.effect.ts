import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GenderActions from './genderList.action';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { GENDER_LIST } from './genderList.constant';

@Injectable()
export class GenderEffects {
  private actions$ = inject(Actions);

  loadGenderList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenderActions.loadGenderList),
      switchMap(() =>
        of(GENDER_LIST).pipe(
          map((genderList) =>
            GenderActions.loadGenderListSuccess({ genderList })
          ),
          catchError(() =>
            of(
              GenderActions.loadGenderListFailure({
                error: 'Failed to load gender list',
              })
            )
          )
        )
      )
    )
  );
}
