import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { SnackbarService } from '../../shared/services/snackbar-service/snackbar-service';
import { tap } from 'rxjs';
import { ResultType } from '../enum/result-type.enum';
import { ApiResponse } from '../../shared/model/api-response';

export const apiNotificationInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);

  return next(req).pipe(
    tap((event) => {
      if (
        event instanceof HttpResponse &&
        req.method !== 'GET' &&
        (event.body as ApiResponse<any>)?.result !== undefined
      ) {
        const { result, message } = event.body as ApiResponse<any>;

        switch (result) {
          case ResultType.Success:
            snackbarService.success(message);
            break;
          case ResultType.Failure:
            snackbarService.error(message);
            break;
          default:
            snackbarService.info(message);
            break;
        }
      }
    })
  );
};
