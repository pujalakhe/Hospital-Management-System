import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar-service/snackbar-service';
import { API_ERROR_CODES } from '../../constants/api-error-code-constants/api-error-codes.constant';
import { SNACKBAR_DURATION } from '../../../shared/constants/snackbar-constants/snackbar.constants';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackbar: SnackbarService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const code = event.body?.code;
          switch (code) {
            case API_ERROR_CODES.SUCCESS:
            case API_ERROR_CODES.CREATED:
              this.snackbar.success(
                event.body?.message || 'Operation Successful',
                SNACKBAR_DURATION.SHORT
              );
              break;
            default:
              break;
          }
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        const code = error?.error?.code;
        const status = error?.status;
        const message = error?.error?.message || 'something went wrong';

        switch (true) {
          case code === API_ERROR_CODES.UNAUTHORIZED ||
            status === API_ERROR_CODES.UNAUTHORIZED:
            this.snackbar.error(
              'Session expired.Please log in again.',
              SNACKBAR_DURATION.LONG
            );
            this.router.navigate(['/login']);
            break;
          case status === API_ERROR_CODES.BAD_REQUEST:
            this.snackbar.error(
              message || 'Invalid request. Please check your input.',
              SNACKBAR_DURATION.MEDIUM
            );
            break;

          case status === API_ERROR_CODES.FORBIDDEN:
            this.snackbar.error(
              'You do not have permission to perform this action.',
              SNACKBAR_DURATION.LONG
            );
            break;
          case status === API_ERROR_CODES.NOT_FOUND:
            this.snackbar.error(
              'Requested resource not found.',
              SNACKBAR_DURATION.MEDIUM
            );
            break;
          case status === API_ERROR_CODES.INTERNAL_SERVER_ERROR:
            this.snackbar.error(
              'Internal server error.Please try again later.',
              SNACKBAR_DURATION.MEDIUM
            );
            break;
          default:
            this.snackbar.error(message, SNACKBAR_DURATION.MEDIUM);
            break;
        }
        return throwError(() => error);
      })
    );
  }
}
