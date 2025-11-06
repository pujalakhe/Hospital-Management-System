import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as RoleActions from './roleList.action';
import { RoleListService } from '../../services/api-service/role-list-api/role-list-service';

@Injectable()
export class RoleEffects {
  private actions$ = inject(Actions);

  constructor(private roleListService: RoleListService) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRole),
      mergeMap(() =>
        this.roleListService.getRoles().pipe(
          map((response) =>
            RoleActions.loadRoleSuccess({ roles: response.data })
          ),
          catchError((error) => of(RoleActions.loadRoleFailure({ error })))
        )
      )
    )
  );
}
