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
          switch (true) {
            case code === 2000 || code === 2001:
              this.snackbar.success(
                event.body?.message || 'Operation Successful',
                2500
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
          case code === 4001 || status === 401:
            this.snackbar.error('Session expired.Please log in again.', 5000);
            this.router.navigate(['/login']);
            break;
          case status === 500:
            this.snackbar.error(
              'Internal server error.Please try again later.',
              5000
            );
            break;
          case status === 0:
            this.snackbar.error(
              'Network error.Please check your connection.',
              5000
            );
            break;
          default:
            this.snackbar.error(message, 4000);
            break;
        }
        return throwError(() => error);
      })
    );
  }
}
